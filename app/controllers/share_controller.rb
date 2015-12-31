class ShareController < ApplicationController
  before_action :authenticate_user!

  def create
    other_user = User.where(email: (share_params[:email].try :downcase))

    unless other_user.present?
      other_user_existed = false
      other_user = User.new(email: (share_params[:email].try :downcase), share_pending: true)
    else
      other_user_existed = true
      other_user = other_user[0]
    end

    people = []

    if share_params[:group_ids]
      have_people_to_add = false
      share_params[:group_ids].each do |id|
        group = current_user.groups.find(id)
        if group.people.present?
          have_people_to_add = true
          group.people.each do |person|
            people << person if !people.include? person
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
        people << person if !people.include? person
      end
    else
      render json: { error: "No groups or people were provided."}, status: :unprocessable_entity
      return
    end

    people.each do |person|
      duplicate_person = person.dup
      if person.image.url != "/assets/images/original/missing.png"
        image = URI.parse(person.image.url)
        duplicate_person.image = image
      end
      other_user.people << duplicate_person
    end

    unless other_user_existed
      if other_user.save!(validate: false)
        ShareMailer.new_user(current_user, other_user).deliver_now
        render json: { success: true } , status: :created
      else
        render json: other_user.errors, status: :unprocessable_entity
      end
    else
      if other_user.save
        ShareMailer.existing_user(current_user, other_user).deliver_now
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