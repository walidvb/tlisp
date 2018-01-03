class Clique < ActiveRecord::Base
    include FriendlyId
    friendly_id :name, use: [:slugged, :finders]

    has_many :clique_memberships, inverse_of: :clique
    has_many :users, -> { confirmed }, through: :clique_memberships, inverse_of: :cliques
    has_many :link_clique_assignments, inverse_of: :clique
    has_many :links, through: :link_clique_assignments, inverse_of: :cliques

    validates_presence_of :name
end
