class Link < ActiveRecord::Base
    acts_as_taggable_on :tags, :genre
    serialize :oembed, Hash
    belongs_to :user
    before_save :add_oembed
    
    validates_presence_of :user

    private
    def get_oembed
        if resource = PlisOEmbed.get(self.url)
            resource.fields
        else
            {}
        end
    end
    
    def add_oembed
        self.oembed = get_oembed
    end
end
