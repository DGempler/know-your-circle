class Ownership < ActiveRecord::Base
  belongs_to :user
  belongs_to :guest_user_person
end