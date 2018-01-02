class LinkCliqueAssignment < ActiveRecord::Base
    belongs_to :clique, inverse_of: :link_clique_assignments
    belongs_to :link, inverse_of: :link_clique_assignments
    belongs_to :user

    scope :visible, ->{ where.not(visible: false)}
    validates :link, uniqueness: { scope: [:clique_id, :user_id] }
    # validates :link, uniqueness: { scope: [:playlist_id, :user_id] }
end