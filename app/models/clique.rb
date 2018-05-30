class Clique < ActiveRecord::Base
    include FriendlyId
    friendly_id :name, use: [:slugged, :finders]

    has_many :clique_memberships, inverse_of: :clique, :dependent => :destroy
    #has_many :users, -> { confirmed }, through: :clique_memberships, inverse_of: :cliques
    has_many :users, through: :clique_memberships, inverse_of: :cliques
    has_many :link_clique_assignments, inverse_of: :clique, :dependent => :destroy
    has_many :links, through: :link_clique_assignments, inverse_of: :cliques

    validates_presence_of :name

    rails_admin do 
        [:created_at, :updated_at].each do |ff|
        configure ff do
          visible false
        end
      end

        list do
          field :id
          field :name
          field :users
          field :links
          field :links_count do 
            formatted_value{ bindings[:object].links.count }
          end
        end
    end
end
