require 'rails_helper'

describe PeopleController, :type => :controller do
  describe "anonymous user" do
    before :each do
      # This simulates an anonymous user
      login_with nil
    end

    it "should get a 401 for index action" do
      get :index
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for create action" do
      post :create
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for show action" do
      get :show, id: ""
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for update action" do
      post :update, id: ""
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for destroy action" do
      get :destroy, id: ""
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
