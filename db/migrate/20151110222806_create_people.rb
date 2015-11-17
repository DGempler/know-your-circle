class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.timestamps
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :sex
      t.string :nickname
      t.string :bio
      t.string :location
      t.string :occupation
      t.string :dob
    end
  end

end
