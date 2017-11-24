class Clique < ActiveRecord::Base
    has_many :clique_memberships, inverse_of: :user
    has_many :users, through: :clique_memberships, inverse_of: :cliques
    has_many :links, inverse_of: :clique
end
