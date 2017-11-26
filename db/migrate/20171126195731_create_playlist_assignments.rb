class CreatePlaylistAssignments < ActiveRecord::Migration
  def change
    create_table :playlist_assignments do |t|
      t.references :playlist
      t.references :link

      t.timestamps null: false
    end
    add_index :playlist_assignments, [:playlist_id, :link_id], unique: true
  end
end
