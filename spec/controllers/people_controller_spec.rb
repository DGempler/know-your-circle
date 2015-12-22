require 'rails_helper'

RSpec.describe PeopleController, :type => :controller do
  describe "anonymous user" do
    before :each do
      # This simulates an anonymous user
      login_with nil
    end

    it "should be redirected to signin" do
      get :index
      expect( response.status ).to eq(401)
    end
  end
end
