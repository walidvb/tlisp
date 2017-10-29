class Link < ActiveRecord::Base
    belongs_to :user
    before_save :add_oembed
    
    def get_oembed
        
        resource = PlisOEmbed.get(self.url)
        resource.html
    end
    private
    
    def add_oembed
        resource = get_oembed
    end
end
