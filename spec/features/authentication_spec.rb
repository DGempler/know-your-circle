require 'rails_helper.rb'

feature 'Authentication', js: true do
  feature 'login' do
    scenario 'with valid inputs' do
      @user = FactoryGirl.create(:confirmed_user)
      visit '/'
      click_link('log-in')

      fill_in "Email", with: @user.email
      fill_in "Password", with: @user.password
      find("button", text: "Log In").click

      expect(page).to have_content("Add People")
      expect(page).to have_content("Play Games")
      expect(page).to have_content("Account")
    end
  end
end