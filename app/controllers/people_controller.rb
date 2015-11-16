class PeopleController < ApplicationController
  before_action :set_person, only: [:show, :update, :destroy]

  def index
    @people = Person.all
    people = []
    @people.each do |person|
      medium = person.image.url(:medium)
      thumb = person.image.url(:thumb)
      person = person.as_json
      person[:medium] = medium
      person[:thumb] = thumb
      people << person
    end
    render json: people, status: :ok
  end

  def create
    @person = Person.new person_params
    if @person.save
      hints_params.each do |index, hint|
        new_hint = Hint.create Hash["hint",  hint]
        @person.hints << new_hint
      end
      if @person.save
        render json: @person, status: :created
      else
        render json: @person.errors, status: :unprocessable_entity
      end
    else
      render json: @person.errors, status: :unprocessable_entity
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

  def hints_params
    params[:hints] ||= []
    params.require(:hints).permit(:'0', :'1', :'2', :'3', :'4', :'5', :'6', :'7', :'8', :"9")
  end

  def set_person
    @person = Person.find(params[:id])
  end

end