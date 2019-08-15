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
            "url"  => canonical,
            "site_name" => site_name
        }
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
            @page.search('link[rel="canonical"]').first.attributes['href'].value
        rescue
            @url
        end
    end

    def is_bandcamp?
        /bandcamp/.match(get_value("twitter:site"))
    end
end