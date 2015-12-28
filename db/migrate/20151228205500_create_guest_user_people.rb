class CreateGuestUserPeople < ActiveRecord::Migration
  def change
    create_table :guest_user_people do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :sex
      t.string :nickname
      t.string :bio
      t.string :location
      t.string :occupation
      t.string :dob
      t.string :dod
      t.text :hints, array: true, default: []
      t.boolean :is_guest, default: true
    end
  end
end
