module Overrides
  class TokenValidationsController < DeviseTokenAuth::TokenValidationsController
    skip_before_filter :assert_is_devise_resource!, :only => [:validate_token]
    before_filter :set_user_by_token, :only => [:validate_token]

    def validate_token
      # @resource will have been set by set_user_by_token concern
      if @user
        medium = @user.image.url(:medium)
        puts "medium"
        puts medium
        thumb = @user.image.url(:thumb)
        puts "thumb"
        puts thumb
        @user = @user.as_json(except: [
          :tokens, :created_at, :updated_at
        ])
        @user[:medium] = medium
        @user[:thumb] = thumb
        render json: {
          success: true,
          data: @user
        }
      else
        render json: {
          success: false,
          errors: ["Invalid login credentials"]
        }, status: 401
      end
    end
  end
end