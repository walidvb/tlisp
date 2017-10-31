class AddPublishedToLinks < ActiveRecord::Migration
  def change
    add_column :links, :published, :boolean, default: true
    add_column :links, :is_a_set, :boolean, default: false
  end
end
