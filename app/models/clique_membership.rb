class CliqueMembership < ActiveRecord::Base
    belongs_to :user, inverse_of: :clique_memberships
    belongs_to :clique, inverse_of: :clique_memberships
end
