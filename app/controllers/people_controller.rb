class PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def new
    @person = Person.new
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

end