require 'rails_helper'

describe PeopleController, :type => :controller do
  let(:created_user) { create(:user) }
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
      get :show, id: created_user.id
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for update action" do
      post :update, id: created_user.id
      expect( response.status ).to eq(401)
    end
    it "should get a 401 for destroy action" do
      get :destroy, id: created_user.id
      expect( response.status ).to eq(401)
    end

  end

  describe "signed in user" do
    let(:created_person) { create(:person, user_id: created_user.id) }
    before :each do
      login_with created_user
    end

    it "should send all people for index action" do
      get :index
      expect( JSON.parse(response.body) ).to eq([])
      expect( response.status ).to eq(200)
    end

    it "should return the newly created person for create action" do
      post :create, { person: attributes_for(:person) }
      expect( response.body ).to include('created_at', 'updated_at')
      expect( response.status ).to eq(201)
    end

    it "should return the requested person" do
      get :show, id: created_person.id
      expect( response.body ).to include('created_at', 'updated_at')
      expect( response.status ).to eq(200)
    end

    it "should return the newly edited person for update action" do
      put :update, { id: created_person.id , person: { first_name: 'newfirstname', last_name: 'newlastname' }}
      expect( JSON.parse(response.body)['id'] ).to eq(created_person.id)
      expect( JSON.parse(response.body)['first_name'] ).to eq('newfirstname')
      expect( JSON.parse(response.body)['last_name'] ).to eq('newlastname')
      expect( response.status ).to eq(200)
    end

    it "should return the deleted person for delete action" do
      delete :destroy, { id: created_person.id }
      expect( JSON.parse(response.body)['id'] ).to eq(created_person.id)
      expect( response.status ).to eq(200)
    end

    it "delete action should have removed person from user" do
      expect( created_user.people ).to eq([])
    end

  end
end
