class ApplicationMailer < ActionMailer::Base
  default from: "noreply@knowyourcircle.heroku.com"
  layout 'mailer'
end
