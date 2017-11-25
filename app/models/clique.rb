class Clique < ActiveRecord::Base
    include FriendlyId
    friendly_id :name, use: [:slugged, :finders]

    has_many :clique_memberships, inverse_of: :user
    has_many :users, through: :clique_memberships, inverse_of: :cliques
    has_many :links, inverse_of: :clique

    validates_presence_of :name
end
