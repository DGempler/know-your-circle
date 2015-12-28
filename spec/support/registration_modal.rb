class RegistrationModal
  include Capybara::DSL

  def visit
    Capybara::visit '/'
    click_link('sign-up')
  end

  def complete_form(options)
    fill_in "First Name", with: options.first_name
    fill_in "Last Name", with: options.last_name
    fill_in "Email", with: options.email
    fill_in "Password", with: options.password
    fill_in "Confirm Password", with: options.password_confirmation
    find("button", text: "Sign Up").click
  end

end