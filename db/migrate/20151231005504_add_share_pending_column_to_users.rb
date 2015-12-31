class AddSharePendingColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :share_pending, :boolean
  end
end
