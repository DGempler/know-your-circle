class PeopleController < ApplicationController
  before_action :authenticate_user!

  def create
    @user = User.new share_params[:email]

    current_user

    if @person.save
      render json: @person, status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  private
  def share_params
    params[:user][:group_ids] ||= []
    params.require(:user).permit(:email, group_ids: [])
  end

end