require 'rails_helper.rb'

feature "Visit website", js: true do
  scenario "homepage" do
    visit '/'

    expect(page).to have_content("Memorize names and faces")
    expect(page).to have_content("Welcome to Know your Circle!")
  end
end