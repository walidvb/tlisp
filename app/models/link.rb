class Link < ActiveRecord::Base
    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    belongs_to :user

    belongs_to :clique, inverse_of: :links
    before_save :add_oembed
    
    validates_presence_of :user, :clique
    validates :url, uniqueness: { scope: :clique_id }

    def is_duplicate?
        self.clique.links.where(url: self.url).count > 0
    end

    [   "title",
        "description",
        "thumbnail_url",
        "html",
        "author_name",
        "height",
        "width",
        "provider_name",
        "provider_url"
    ].each do |oembed_method|
        define_method oembed_method do |*args|
            self.oembed[oembed_method]
        end

    end

    private
    def get_oembed
        DDOEmbed.get(self.url) || {}
    end
    
    def add_oembed
        self.oembed = get_oembed
    end

end
