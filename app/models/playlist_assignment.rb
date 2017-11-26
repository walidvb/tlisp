class PlaylistAssignment < ActiveRecord::Base
    belongs_to :playlist, inverse_of: :playlist_assignments
    belongs_to :link, inverse_of: :playlist_assignments
end
