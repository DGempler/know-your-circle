class DemoController < ApplicationController

  def index
    @people = GuestUserPerson.all
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

  def show
    @person = GuestUserPerson.find(params[:id])
    medium = @person.image.url(:medium)
    thumb = @person.image.url(:thumb)
    @person = @person.as_json(include: :groups)
    @person[:medium] = medium
    @person[:thumb] = thumb
    render json: @person, status: :ok
  end

end