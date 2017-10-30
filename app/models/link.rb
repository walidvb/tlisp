class Link < ActiveRecord::Base
    acts_as_taggable
    serialize :oembed, Hash
    belongs_to :user
    before_save :add_oembed
    
    private
    def get_oembed
        if resource = PlisOEmbed.get(self.url)
            resource.fields
        else
            "{}"
        end
    end
    
    def add_oembed
        self.oembed = get_oembed
    end
end
