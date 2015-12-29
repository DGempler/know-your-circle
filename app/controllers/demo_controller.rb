class DemoController < ApplicationController

  def index
    @people = current_or_guest_user.guest_user_people.all
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
    @person = current_or_guest_user.guest_user_people.find(params[:id])
    medium = @person.image.url(:medium)
    thumb = @person.image.url(:thumb)
    @person = @person.as_json(include: :groups)
    @person[:medium] = medium
    @person[:thumb] = thumb
    render json: @person, status: :ok
  end

end