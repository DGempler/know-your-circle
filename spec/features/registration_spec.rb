require 'spec_helper'

feature "Registration", js: true do
  before do
    @registration_modal = RegistrationModal.new
    @registration_modal.visit
    @user = build(:user)
  end

  scenario "with valid inputs" do
    @registration_modal.complete_form(@user)

    expect(page).to have_content("A confirmation email has been sent to #{@user.email}")

  end

  scenario 'with a password less than 8 characters' do
    @user.password = 'a'
    @user.password_confirmation = 'a'
    @registration_modal.complete_form(@user)

    expect(page).to have_content('Your password must be at least 8 characters. Please try again.')
  end

end