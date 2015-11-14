class CreateHints < ActiveRecord::Migration
  def change
    create_table :hints do |t|
      t.timestamps
      t.string :hint
      t.references :person
    end
  end
end
