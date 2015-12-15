class User < ActiveRecord::Base
  has_many :people, dependent: :destroy
  has_many :groups, dependent: :destroy
  # Include default devise modules.
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  validates_presence_of :email, :first_name, :last_name
  validates_uniqueness_of :email

  # This method associates the attribute ":image_url" with a file attachment
  has_attached_file :image, styles: {
    thumb: '100x100>',
    medium: '300x300>'
  },
  default_url: "/assets/images/:style/missing.png"

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end
