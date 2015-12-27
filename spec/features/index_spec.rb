require 'rails_helper.rb'

feature "Visit website", js: true do
  scenario "homepage" do
    visit '/'

    expect(page).to have_content("Memorize names and faces")
    expect(page).to have_content("Welcome to Know your Circle!")
  end

  scenario "anonymous user" do
    visit '/'

    expect(page).to have_content("Sign Up")
    expect(page).to have_content("Log In")
    expect(page).not_to have_content("Get started by adding some people!")
    expect(page).not_to have_content("Add People")
    expect(page).not_to have_content("Play Games")
    expect(page).not_to have_content("Account")
    expect(page).not_to have_content("My Profile")
    expect(page).not_to have_content("Log Out")
  end
end