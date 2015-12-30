class ShareMailer < ApplicationMailer

  def new_user(sending_user, receiving_user)
    @sending_user = sending_user
    @receiving_user = receiving_user
    @new_auth_header = @receiving_user.create_new_auth_token
    puts 'about'
    puts 'to'
    puts 'puts'
    puts 'auth header'
    puts @new_auth_header
    mail(to: @receiving_user.email, subject: "#{@sending_user.first_name} #{@sending_user.last_name} has invited you to Know Your Circle!" )
  end

  def existing_user(sending_user, receiving_user)
    @sending_user = sending_user
    @receiving_user = receiving_user
    mail(to: @receiving_user.email, subject: "You've been sent some people!" )
  end
end
