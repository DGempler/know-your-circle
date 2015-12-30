class ShareController < ApplicationController
  before_action :authenticate_user!

  def create
    other_user = User.where(email: share_params[:email])


    unless other_user.present?
      other_user_existed = false
      other_user = User.new(email: share_params[:email])
    else
      other_user_existed = true
      other_user = other_user[0]
    end

    people = []

    share_params[:group_ids].each do |id|
      group = current_user.groups.find(id)
      group.people.each do |person|
        people << person if !people.include? person
      end
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
        render json: other_user, status: :created
      else
        render json: other_user.errors, status: :unprocessable_entity
      end
    else
      if other_user.save
        ShareMailer.existing_user(current_user, other_user).deliver_now
        render json: other_user, status: :ok
      else
        render json: other_user.errors, status: :unprocessable_entity
      end
    end

  end

  private
  def share_params
    params[:share][:group_ids] ||= []
    params.require(:share).permit(:email, group_ids: [])
  end

end