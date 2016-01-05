class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]
  before_action :authenticate_user!

  def index
    @people = current_user.people.all
    people = []
    @people.each do |person|
      medium = person.image.url(:medium)
      thumb = person.image.url(:thumb)
      person = person.as_json(include: :groups)
      person[:medium] = medium
      person[:thumb] = thumb
      people << person
    end
    render json: people, status: :ok
  end

  def create
    updated_person_params = person_params
    updated_person_params[:save_images_in_background] = false
    @person = current_user.people.new updated_person_params
    if @person.save
      render json: @person, status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def show
    medium = @person.image.url(:medium)
    thumb = @person.image.url(:thumb)
    @person = @person.as_json(include: :groups)
    @person[:medium] = medium
    @person[:thumb] = thumb
    render json: @person, status: :ok
  end

  def update
    if @person.update person_params
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
  def person_params
    params[:person][:hints] ||= []
    params[:person][:group_ids] ||= []
    params.require(:person).permit(:first_name, :middle_name, :last_name, :image, :sex, :nickname, :bio, :location, :occupation, :dob, hints: [], group_ids: [])
  end

  def set_person
    if current_user
      @person = current_user.people.find(params[:id])
    else
      render json: {
        error: "The request requires user authentication",
        status: 401
      }, status: 401
    end

  end

end