class Playlist < ActiveRecord::Base
  belongs_to :user, inverse_of: :playlists
  has_many :links, inverse_of: :playlist
end
