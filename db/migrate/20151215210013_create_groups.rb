class CreateGroups < ActiveRecord::Migration
  def change
    create_table :groups do |t|
      t.timestamps
      t.string :name
      t.references :user
    end
  end
end
