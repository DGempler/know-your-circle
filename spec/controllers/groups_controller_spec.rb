require 'rails_helper'

describe GroupsController, :type => :controller do
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
    let(:created_group) { create(:group, user_id: created_user.id) }
    before :each do
      login_with created_user
    end

    it "should send all groups for index action" do
      get :index
      expect( JSON.parse(response.body) ).to eq([])
      expect( response.status ).to eq(200)
    end

    it "should return the newly created group for create action" do
      post :create, { group: attributes_for(:group) }
      expect( response.body ).to include('created_at', 'updated_at')
      expect( response.status ).to eq(201)
    end

    it "should return the requested group" do
      get :show, id: created_group.id
      expect( response.body ).to include('created_at', 'updated_at')
      expect( response.status ).to eq(200)
    end

    it "should return the newly edited group for update action" do
      put :update, { id: created_group.id , group: { name: 'newGroupName' }}
      expect( JSON.parse(response.body)['id'] ).to eq(created_group.id)
      expect( JSON.parse(response.body)['name'] ).to eq('newGroupName')
      expect( response.status ).to eq(200)
    end

    it "should return the deleted group for delete action" do
      delete :destroy, { id: created_group.id }
      expect( JSON.parse(response.body)['id'] ).to eq(created_group.id)
      expect( response.status ).to eq(200)
    end

    it "delete action should have removed group from user" do
      expect( created_user.groups ).to eq([])
    end

  end

end
