class DestroyOwnerships < ActiveRecord::Migration
  def change
    drop_table :ownerships
  end
end
