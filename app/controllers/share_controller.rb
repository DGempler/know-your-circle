class PeopleController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.new share_params[:email]

    people = []

    share_params[:group_ids].each do |id|
      group = current_user.groups.includes(:people).find(id)
      group.people.each do |person|
        people << person if !people.include? person
      end

    puts 'about'
    puts 'to'
    puts 'puts'
    puts 'people'
    puts people
    puts user

    end

    # if @person.save
    #   render json: @person, status: :created
    # else
    #   render json: @person.errors, status: :unprocessable_entity
    # end
  end

  private
  def share_params
    params[:user][:group_ids] ||= []
    params.require(:user).permit(:email, group_ids: [])
  end

end