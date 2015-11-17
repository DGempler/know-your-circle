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
      hints_params['hints'].each do |index, hint|
        new_hint = Hint.create Hash[:hint,  hint]
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
    @person = @person.as_json(:include => :hints)
    @person[:medium] = medium
    @person[:thumb] = thumb
    render json: @person, status: :ok
  end

  def update
    if @person.update person_params
      puts 'done'
      hints_params['hints'].each do |index, hint|
        begin
          Hint.find(hint[:id]).update Hash[:hint,  hint[:hint]]
        rescue ActiveRecord::RecordNotFound
          new_hint = Hint.create Hash[:hint,  hint[:hint]]
          @person.hints << new_hint
          @person.save
        end
      end
      puts 'about to render json'
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
    params.require(:person).permit(:first_name, :middle_name, :last_name, :image, :sex, :nickname, :bio, :location, :occupation, :dob)
  end

  def hints_params
    params[:hints] ||= []
    params.permit(hints: [:'0', :"1", :"2", :id, :hint])
  end

  def set_person
    @person = Person.find(params[:id])
  end

end