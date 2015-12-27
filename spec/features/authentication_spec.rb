require 'rails_helper.rb'

feature 'Authentication', js: true do
  before do
    @user = FactoryGirl.create(:confirmed_user)
    visit '/'
    click_link('log-in')
    @login_modal = LoginModal.new
  end

  feature 'login' do
    scenario 'with valid inputs' do
      @login_modal.log_in(@user.email, @user.password)
      expect(page).to have_content("Add People")
      expect(page).to have_content("Play Games")
      expect(page).to have_content("Account")
    end

    scenario 'with invalid credentials' do
      @login_modal.log_in('fake_email@fake.com', 'not a real password')
      expect(page).to have_content('Invalid credentials.')
      expect(page).to have_content('Please try again')
    end

  end
end