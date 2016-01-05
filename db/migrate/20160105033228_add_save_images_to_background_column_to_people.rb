class AddSaveImagesToBackgroundColumnToPeople < ActiveRecord::Migration
  def change
    add_column :people, :save_images_in_background, :boolean
  end
end
