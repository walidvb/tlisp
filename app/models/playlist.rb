class Playlist < ActiveRecord::Base
  belongs_to :user, inverse_of: :playlists
  has_many :playlist_assignments, inverse_of: :playlist
  has_many :links, through: :playlist_assignments, inverse_of: :playlists
end
