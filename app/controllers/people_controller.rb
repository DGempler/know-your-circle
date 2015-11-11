class PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def new
    @person = Person.new
  end

  def create
    @person = Person.new person_params

    if @person.save
      redirect_to @author
    else
      render :new
    end
  end

  def show
    @person = Person.find(params[:id])
  end

  def edit
  end

  def update

  end

  def destroy
  end

  private
  def person_params
    params.require(:person).permit(:first_name, :last_name)
  end

end