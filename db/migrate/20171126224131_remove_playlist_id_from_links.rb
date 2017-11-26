class RemovePlaylistIdFromLinks < ActiveRecord::Migration
  def change
    remove_column :links, :playlist_id
  end
end
