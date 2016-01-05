class Person < ActiveRecord::Base
  belongs_to :user
  has_many :memberships, dependent: :destroy
  has_many :groups, through: :memberships

  validates_presence_of :first_name, :last_name

  # This method associates the attribute ":image_url" with a file attachment
  has_attached_file :image, styles: {
    thumb: '100x100>',
    medium: '300x300>'
  },
  default_url: "/assets/images/:style/missing.png",
  only_process: lambda { |a| a.instance.save_images_in_background ? [:original] : [:medium] }

  # Validate the attached image is image/jpg, image/png, etc
  validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/

  process_in_background :image, only_process: lambda { |a| a.instance.save_images_in_background ? [:thumb, :medium] : [:thumb] }

  after_create :assign_original_id

  private
  def assign_original_id
    unless self.original_id
      self.original_id = self.id
      self.save
    end
  end

end