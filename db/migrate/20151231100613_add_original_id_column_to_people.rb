class AddOriginalIdColumnToPeople < ActiveRecord::Migration
  def change
    add_column :people, :original_id, :integer
  end
end
