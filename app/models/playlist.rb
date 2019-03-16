class Playlist < ActiveRecord::Base
  include FriendlyId
  friendly_id :name, use: [:slugged, :finders]
  
  belongs_to :user, inverse_of: :playlists
  has_many :playlist_assignments, inverse_of: :playlist, :dependent => :destroy
  has_many :links, through: :playlist_assignments, inverse_of: :playlists do 
    def recent
      limit(12)
    end
  end

  validates_presence_of :name
end
