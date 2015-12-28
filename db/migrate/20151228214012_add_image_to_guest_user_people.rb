class AddImageToGuestUserPeople < ActiveRecord::Migration
  def self.up
    add_attachment :guest_user_people, :image
  end

  def self.down
    remove_attachment :guest_user_people, :image
  end
end
