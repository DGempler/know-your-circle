class CreateOwnerships < ActiveRecord::Migration
  def change
    create_table :ownerships do |t|
      t.timestamps
      t.references :user
      t.references :guest_user_person
    end
  end
end
