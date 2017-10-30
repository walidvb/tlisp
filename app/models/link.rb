class Link < ActiveRecord::Base
    belongs_to :user
    before_save :add_oembed
    
    def get_oembed
        resource = PlisOEmbed.get(self.url)
        resource.try(:html)
    end
    private
    
    def add_oembed
        begin
            resource = get_oembed
        rescue => e
            resource = nil
        end
    end
end
