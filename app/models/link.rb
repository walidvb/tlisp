class Link < ActiveRecord::Base
    serialize :oembed, Hash
    belongs_to :user
    before_save :add_oembed
    
    def get_oembed
        if resource = PlisOEmbed.get(self.url)
            resource.fields
        else
            "{}"
        end
    end
    private
    
    def add_oembed
        embed_code = get_oembed
        puts embed_code
        # {"version"=>1.0, "type"=>"rich", "provider_name"=>"SoundCloud", "provider_url"=>"http://soundcloud.com", "height"=>400, "width"=>"100%", "title"=>"Forecast 005: DJACM + Time Is Away by 12th Isle", "description"=>"Fergus Clark and Jack Rollo of 'Time is Away' (NTS) playing records in a loose and relaxed manner. Originally presented as a live radio broadcast some time early 2016, \n\nwww.instagram.com/timeisaway", "thumbnail_url"=>"http://i1.sndcdn.com/artworks-000144443728-8b51ne-t500x500.jpg", "html"=>"<iframe width=\"100%\" height=\"400\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F243616970&show_artwork=true&in=12th-isle%2Fsets%2F12th-isle-forecasts\"></iframe>", "author_name"=>"12th Isle", "author_url"=>"https://soundcloud.com/12th-isle"}
        puts embed_code.class
        # Hash
        self.oembed = embed_code
    end
end
