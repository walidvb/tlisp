require 'open-uri'

class BandcampOembed
    def initialize url
        @url = url
        @page = get_page
    end

    def get_oembed
        begin 
            build_oembed
        rescue e
            puts "Failed getting #{url}"
            raise e
        end
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
            "provider_url" => "http://bandcamp.com",
        }
    end

    def build_iframe url
        id_er = ""
        if matches = /album=(\d+)\//.match(url)
            id_er = "album=#{matches[1]}"
        elsif matches = /track=(\d+)\//.match(url)
            id_er = "track=#{matches[1]}"
        else
            p "Failed to get album_id for #{url}"
            return
        end
        "<iframe style='border: 0; width: 350px; height: 522px;' src='//bandcamp.com/EmbeddedPlayer/v=2/#{id_er}/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/' seamless></iframe>"
    end

    def get_value property
        if node = @page.search("[property='#{property}']").first
            node.attribute('content').value
        end
    end

    def get_page
        Nokogiri::HTML(open(@url))   
    end

    def is_bandcamp?
        /bandcamp/.match(get_value("twitter:site"))
    end
end