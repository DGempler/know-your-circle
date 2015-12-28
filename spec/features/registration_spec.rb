require 'spec_helper'

feature "Registration", js: true do
  before do
    visit '/'
    click_link('sign-up')
    @user = build(:user)
  end

  scenario "with valid inputs" do

    fill_in "First Name", with: @user.first_name
    fill_in "Last Name", with: @user.last_name
    fill_in "Email", with: @user.email
    fill_in "Password", with: @user.password
    fill_in "Confirm Password", with: @user.password_confirmation
    find("button", text: "Sign Up").click

    expect(page).to have_content("A confirmation email has been sent to #{@user.email}")

    expect(ActionMailer::Base.deliveries.count).to eq(1)

    expect(ActionMailer::Base.deliveries.first.to).to eq([@user.email])

  end

  scenario 'with a too-short password' do
    password = 'a'
    fill_in "First Name", with: @user.first_name
    fill_in "Last Name", with: @user.last_name
    fill_in "Email", with: @user.email
    fill_in "Password", with: password
    fill_in "Confirm Password", with: @user.password_confirmation
    find("button", text: "Sign Up").click

    expect(page).to have_content('Your password must be at least 8 characters. Please try again.')
  end

end