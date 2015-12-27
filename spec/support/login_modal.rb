class LoginModal < Struct.new(:title)
  include Capybara::DSL

  def log_in(email, password)
    fill_in "Email", with: email
    fill_in "Password", with: password
    find("button", text: "Log In").click
  end
end