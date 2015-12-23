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

    it "index should send all people" do
      get :index
      expect( JSON.parse(response.body) ).to eq([])
      expect( response.status ).to eq(200)
    end

    it "create should return the newly created person" do
      post :create, { person: { first_name: 'a', last_name: 'b' } }
      puts response.body
      expect( response.status ).to eq(201)
    end

  end
end
