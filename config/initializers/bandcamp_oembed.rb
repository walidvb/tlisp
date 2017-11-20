require 'open-uri'

class BandcampOembed
    def initialize url
        @url = url
    end

    def get_oembed
        @page = get_page
        build_oembed
    end

    def build_oembed
        video_url = get_value 'video'
        embed = build_iframe video_url
        description = @page.search('#trackInfo .bd').text()
        {
            title: get_value('title').split(', by ')[0],
            description: description,
            thumbnail_url: get_value('image'),
            html: embed,
            author_name:  get_value('title').split(', by ')[1],
            height: get_value('video:height'),
            width: get_value('video:width'),
            # author_url: 
            provider_name: "Bandcamp",
            provider_url: "htto://bandcamp.com",
        }
        
    end

    def build_iframe url
        if matches = /album=(\d+)\//.match(url)
            album_id = matches[1]
            "<iframe style='border: 0; width: 100%; height: 42px;' src='http://bandcamp.com/EmbeddedPlayer/album=#{album_id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/' seamless></iframe>"
        end
    end

    def get_value property
        p property
        @page.search("[property='og:#{property}']").attribute('content').value.strip
    end

    def get_page
        Nokogiri::HTML(open(@url))   
    end
end