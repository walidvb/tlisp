class Link < ActiveRecord::Base
    serialize :oembed, Hash
    belongs_to :user
    before_save :add_oembed
    
    def get_oembed
        if resource = PlisOEmbed.get(self.url)
            resource.fields.to_json
        else
            "{}"
        end
    end
    private
    
    def add_oembed
        self.oembed = get_oembed
    end
end
