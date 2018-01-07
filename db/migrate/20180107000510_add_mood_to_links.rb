class AddMoodToLinks < ActiveRecord::Migration
  def change
    add_column :links, :mood, :integer, default: 50
  end
end
