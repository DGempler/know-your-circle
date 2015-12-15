class CreateMemberships < ActiveRecord::Migration
  def change
    create_table :memberships do |t|
      t.timestamps
      t.references :group
      t.references :person
    end
  end
end
