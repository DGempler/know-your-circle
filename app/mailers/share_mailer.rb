class ShareMailer < ApplicationMailer

  def new_user(sending_user, receiving_user)
    @sending_user = sending_user
    @receiving_user = receiving_user
    # create env variable for dev/production
    @url = 'http://localhost:3000/#/sign_up'
    mail(to: @receiving_user.email, subject: "#{@sending_user.first_name} #{@sending_user.last_name} has invited you to Know Your Circle!" )

  end

  def existing_user(sending_user, receiving_user)
    @sending_user = sending_user
    @receiving_user = receiving_user
    # create env variable for dev/production
    @url = 'http://localhost:3000/#/log_in'
    mail(to: @receiving_user.email, subject: "#You've been sent some people!" )
  end
end
