class Link < ActiveRecord::Base
    default_scope {order("created_at DESC")}

    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    has_many :playlist_assignments, inverse_of: :link
    has_many :playlists, through: :playlist_assignments, inverse_of: :links
    
    has_many :link_clique_assignments, inverse_of: :link
    has_many :users, through: :link_clique_assignments, inverse_of: :links
    has_many :cliques, through: :link_clique_assignments, inverse_of: :links
    before_save :add_oembed
    
    validates_presence_of :url
    # TODO move description to link_assignment to allow unscoped uniqueness validation 
    # validates :url, uniqueness: { scope: [:clique_id] }

    def is_duplicate?
        self.clique.links.where(url: self.url).count > 0
    end

    def assign_to options = { users: [], visible: false }
        options[:users].each do |user|
            uid = user.is_a?(User) ? user.id : user
            cliques = options[:cliques].presence
            if cliques.nil? || cliques.empty?
                self.link_clique_assignments << LinkCliqueAssignment.new(user_id: uid, visible: options[:visible])
            else
                cliques.each do |clique|
                    cid = clique.is_a?(Clique) ? clique.id : clique
                    self.link_clique_assignments << LinkCliqueAssignment.new(user_id: uid, clique_id: cid, visible: options[:visible])
                end
            end
        end
    end

    [   "title",
        "description",
        "html",
        "author_name",
        "author_url",
        "height",
        "width",
        "provider_name",
        "provider_url"
    ].each do |oembed_method|
        define_method oembed_method do |*args|
            self.oembed[oembed_method]
        end
    end

    def thumbnail_url
        self.oembed['thumbnail_url'] || self.oembed['image']
    end

    def add_oembed
        if new_oembed = get_oembed
            self.oembed = get_oembed
        end
    end

    private
    def get_oembed
        DDOEmbed.get(self.url)
    end
    


end
