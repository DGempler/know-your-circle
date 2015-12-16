class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @groups = current_user.groups.all
    render json: @groups, status: :ok
  end

  def create
    @group = current_user.groups.new group_params
    if @group.save
      render json: @group, status: :created
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def show
    medium = @person.image.url(:medium)
    thumb = @person.image.url(:thumb)
    @person = @person.as_json
    @person[:medium] = medium
    @person[:thumb] = thumb
    render json: @person, status: :ok
  end

  def update
    if @person.update group_params
      render json: @person, status: :ok
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @person.destroy
    render json: @person, status: :ok
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

  def set_person
    @group = current_user.groups.find(params[:id])
  end

end