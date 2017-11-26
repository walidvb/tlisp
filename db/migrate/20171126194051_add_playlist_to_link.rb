class AddPlaylistToLink < ActiveRecord::Migration
  def change
    add_reference :links, :playlist, index: true, foreign_key: true
  end
end
