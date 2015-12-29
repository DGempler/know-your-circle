class AddGuestUserPersonReferenceColumnToMemberships < ActiveRecord::Migration
  def change
    add_column :memberships, :guest_user_person_id, :integer
  end
end
