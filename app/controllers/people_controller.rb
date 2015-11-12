class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]

  def index
    @people = Person.all
    render json: @people, status: :ok
  end

  def create
    @person = Person.new person_params
    if @person.save
      render json: as_json(@person), status: :created
    else
      render json: @person.errors, status: :unprocessable_entity
    end
  end

  def show
    puts as_json(@person)
    render json: as_json(@person), status: :ok
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

  def as_json(options={})
    { first_name: options.first_name, last_name: options.last_name, image: options.image.url(:medium) }
  end

end