class Link < ActiveRecord::Base
    default_scope {order("created_at DESC")}

    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    belongs_to :user
    has_many :playlist_assignments, inverse_of: :link
    has_many :playlists, through: :playlist_assignments, inverse_of: :links

    belongs_to :clique, inverse_of: :links
    before_save :add_oembed
    
    validates_presence_of :user
    validates_presence_of :clique, if: ->{ playlist_assignment_ids.empty? }
    validates :url, uniqueness: { scope: :clique_id }, if: ->{ playlist_assignment_ids.empty? }
    validates :url, uniqueness: { scope: :playlist_ids }, if: ->{ clique_id.blank? }
    validates :url, uniqueness: { scope: :user_id }, if: ->{ clique_id.blank? && playlist_assignment_ids.empty? }

    def is_duplicate?
        self.clique.links.where(url: self.url).count > 0
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

    private
    def get_oembed
        DDOEmbed.get(self.url) || {}
    end
    
    def add_oembed
        self.oembed = get_oembed
    end

end
