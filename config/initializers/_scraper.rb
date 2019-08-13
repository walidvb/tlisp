require 'open-uri'

class Scraper
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

    def get_infos
        {
            "title" => get_value('og:title').strip,
            "description" => get_value('og:description'),
            "image_url" => get_value('og:image'),
            "url":  => @url,
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

    def site_name
        get_value('og:site_name')
    end

    def canonical
        begin
            @page.search('link[rel="canonical"]').first.attributes['href']
        rescue
            @url
        end
    end

    def is_bandcamp?
        /bandcamp/.match(get_value("twitter:site"))
    end
end