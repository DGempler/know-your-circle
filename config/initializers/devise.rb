Devise.setup do |config|
  # The e-mail address that mail will appear to be sent from
  # If absent, mail is sent from "please-change-me-at-config-initializers-devise@example.com"
  config.mailer_sender = "noreply@knowyourcircle.heroku.com"

  # If using rails-api, you may want to tell devise to not use ActionDispatch::Flash
  # middleware b/c rails-api does not include it.
  # See: http://stackoverflow.com/q/19600905/806956
  # config.navigational_formats = [:json]
  config.case_insensitive_keys = [:email]

  config.secret_key = ENV["SECRET_KEY_BASE"] if Rails.env.production?
end