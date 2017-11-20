class Link < ActiveRecord::Base
    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    belongs_to :user
    before_save :add_oembed
    
    validates_presence_of :user
    validates :url, uniqueness: { scope: :user_id }

    def is_duplicate_for_user?
        user.links.select(:url).map(&:url).include?(self.url)
    end

    private
    def get_oembed
        des = DDOEmbed.get(self.url) || {}
        p des
    end
    
    def add_oembed
        self.oembed = get_oembed
    end

end
