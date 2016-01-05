class GuestUserPerson < ActiveRecord::Base
  has_many :memberships, dependent: :destroy
  has_many :groups, through: :memberships

  validates_presence_of :first_name, :last_name

  # This method associates the attribute ":image_url" with a file attachment
  has_attached_file :image, styles: {
    thumb: '100x100>',
    medium: '300x300>'
  },
  default_url: "/assets/images/:style/missing.png"

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  def image_from_url(url)
    self.image = URI.parse(url)
  end

end