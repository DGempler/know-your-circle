class Group < ActiveRecord::Base
  belongs_to :user
  has_many :memberships, dependent: :destroy
  has_many :people, through: :memberships
  validates :name, uniqueness: { scope: :user_id ,
    message: "This group already exists" }
end