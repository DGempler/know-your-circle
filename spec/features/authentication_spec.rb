require 'rails_helper.rb'

feature 'Authentication', js: true do
  before do
    @login_modal = LoginModal.new
    @login_modal.visit
    @user = create(:confirmed_user)
  end

  feature 'login' do
    scenario 'with valid inputs' do
      @login_modal.log_in(@user.email, @user.password)
      expect(page).to have_content("Add People")
      expect(page).to have_content("Play")
      expect(page).to have_content("Account")
    end

    scenario 'with invalid credentials' do
      @login_modal.log_in('fake_email@fake.com', 'not a real password')
      expect(page).to have_content('Invalid credentials.')
      expect(page).to have_content('Please try again')
    end

  end

  feature 'page access' do
    scenario 'visiting people index when not signed in' do
      visit '#/people/index'
      expect(page).to have_css('a', text: 'Log In')
    end

    scenario 'visiting people index when signed in' do
      @login_modal.log_in(@user.email, @user.password)
      expect(page).to have_css('h1', text: 'Your Circle')
    end

  end
end
