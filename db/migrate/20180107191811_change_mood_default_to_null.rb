class ChangeMoodDefaultToNull < ActiveRecord::Migration
  def change
    change_column :links, :mood, :integer, default: nil
    Link.all.update_all(mood: nil)
  end
end
