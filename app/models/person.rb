class Person < ActiveRecord::Base
  validates_presence_of :first_name, :last_name

  # This method associates the attribute ":image_url" with a file attachment
  has_attached_file :image, styles: {
    thumb: '100x100>',
    medium: '300x300>'
  }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

end