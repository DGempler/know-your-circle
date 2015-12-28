class GroupsController < ApplicationController
  before_action :set_group, only: [:show, :update, :destroy]
  before_action :authenticate_user!, except: [:index]

  def index
    @groups = current_or_guest_user.groups.all
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
    render json: @group, status: :ok
  end

  def update
    if @group.update group_params
      render json: @group, status: :ok
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @group.destroy
      render json: @group, status: :ok
    else
      render json: @group.errors, status: :unprocessable_entity
    end
  end

  private
  def group_params
    params.require(:group).permit(:name)
  end

  def set_group
    if current_user
      @group = current_user.groups.find(params[:id])
    else
      render json: {
        error: "The request requires user authentication",
        status: 401
      }, status: 401
    end
  end

end