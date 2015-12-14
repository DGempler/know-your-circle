class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, :sign_out_if_token_present, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) << [:first_name, :last_name]
    devise_parameter_sanitizer.for(:account_update) << [:first_name, :last_name, :middle_name, :sex, :nickname, :bio, :location, :occupation, :dob, :image]
  end

  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format.json? }

  private
  def sign_out_if_token_present
    if params[:auth_token].present? and (params[:auth_token] != current_user.authentication_token)
      sign_out current_user
    end
  end

end
