require 'rails_helper'

describe Overrides::RegistrationsController , :type => :controller do
  describe "anonymous user" do
    let(:created_user) { create(:user) }
    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      # This simulates an anonymous user
      login_with nil
    end

    it "should get a 422 for create action" do
      put :update, id: created_user.id
      expect( response.status ).to eq(422)
    end
    it "should get a 404 for destroy action" do
      get :destroy, id: created_user.id
      expect( response.status ).to eq(404)
    end

  end

end