class ShareController < ApplicationController
  before_action :authenticate_user!

  def create
    if (share_params[:email] =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/).nil?
      render json: { error: "Invalid Email."}, status: :unprocessable_entity
      return
    elsif (share_params[:email].try :downcase) == current_user.email
      render json: { error: "You are not allowed to share people with yourself."}, status: :unprocessable_entity
      return
    end

    other_user = User.includes(:people).find_by(email: (share_params[:email].try :downcase))

    unless other_user.present?
      other_user_existed = false
      other_user = User.new(email: (share_params[:email].try :downcase), first_name: 'temp', last_name: 'temp', share_pending: true)
    else
      other_user_existed = true
    end

    people_to_add = []

    if share_params[:group_ids]
      have_people_to_add = false
      share_params[:group_ids].each do |id|
        group = current_user.groups.find(id)
        if group.people.present?
          have_people_to_add = true
          group.people.each do |person|
            people_to_add << person if !people_to_add.include? person
          end
        end
      end
      if !have_people_to_add
        render json: { error: "No people exist in chosen group(s)."}, status: :unprocessable_entity
        return
      end
    elsif share_params[:people_ids]
      share_params[:people_ids].each do |id|
        person = current_user.people.find(id)
        people_to_add << person if !people_to_add.include? person
      end
    else
      render json: { error: "No groups or people were provided."}, status: :unprocessable_entity
      return
    end

    other_user_people_original_ids = []

    if other_user_existed
      other_user.people.each do |person|
        other_user_people_original_ids << person.original_id
      end
    end

    have_people_to_add = false

    people_to_add.each do |person|
      unless other_user_people_original_ids.include? person.original_id
        have_people_to_add = true
        duplicate_person = person.dup
        if person.image.url != "/assets/images/original/missing.png"
          duplicate_person.save_images_in_background = true
          image = URI.parse(person.image.url)
          duplicate_person.image = image
        end
        other_user.people << duplicate_person
      end
    end

    if !have_people_to_add
      render json: { error: "The recepient already has these people in their Circle."}, status: :unprocessable_entity
      return
    end

    unless other_user_existed
      if other_user.save!(validate: false)
        ShareMailer.new_user(current_user, other_user).deliver_later
        render json: { success: true } , status: :created
      else
        render json: other_user.errors, status: :unprocessable_entity
      end
    else
      if other_user.save
        ShareMailer.existing_user(current_user, other_user).deliver_later
        render json: { success: true }, status: :ok
      else
        render json: other_user.errors, status: :unprocessable_entity
      end
    end

  end

  private
  def share_params
    params.require(:share).permit(:email, group_ids: [], people_ids: [])
  end

end