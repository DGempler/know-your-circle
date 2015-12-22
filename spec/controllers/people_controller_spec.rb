require 'rails_helper'

describe PeopleController, :type => :controller do
  describe "anonymous user" do
    before :each do
      # This simulates an anonymous user
      login_with nil
    end

    it "should get unauthorized 401 status code" do
      get :index
      expect( response.status ).to eq(401)
    end

  end

  describe "signed in user" do
    before :each do
      login_with create( :user )
    end

    it "should send the user json with all people" do
      get :index
      puts response.body
      expect( JSON.parse(response.body) ).to eq([])
    end
  end
end
