require 'open-uri'

class BandcampOembed
    def initialize url
        @url = url
        @page = get_page
    end

    def get_oembed
        build_oembed
    end

    def build_oembed
        video_url = get_value 'og:video'
        embed = build_iframe video_url
        description = @page.search('#trackInfo .bd').text()
        {
            "title" => get_value('og:title').split(', by ')[0].strip,
            "description" => description,
            "thumbnail_url" => get_value('og:image'),
            "html" => embed,
            "author_name" =>  get_value('og:title').split(', by ')[1].strip,
            "height" => get_value('og:video:height'),
            "width" => get_value('og:video:width'),
            # author_url: 
            "provider_name" => "Bandcamp",
            "provider_url" => "htto://bandcamp.com",
        }
    end

    def build_iframe url
        if matches = /album=(\d+)\//.match(url)
            album_id = matches[1]
            "<iframe style='border: 0; width: 100%; height: 42px;' src='http://bandcamp.com/EmbeddedPlayer/album=#{album_id}/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/' seamless></iframe>"
        else
            p "Failed to get album_id for #{url}"
        end
    end

    def get_value property
        @page.search("[property='#{property}']").attribute('content').value
    end

    def get_page
        Nokogiri::HTML(open(@url))   
    end

    def is_bandcamp?
        /bandcamp/.match(get_value("twitter:site"))
    end
end