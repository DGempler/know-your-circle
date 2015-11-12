class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]

  def index
    @people = Person.all
    render json: @people, status: :ok
  end

  def create
    # if params[:image]
    #   decode_image
    # end

    @person = Person.new person_params
    if @person.save
      render json: @person, status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def show
    medium = @person.image.url(:medium)
    @person = @person.as_json
    @person[:medium] = medium
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
    params.require(:person).permit(:first_name, :last_name, :image)
  end

  def set_person
    @person = Person.find(params[:id])
  end

end