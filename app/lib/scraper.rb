require 'open-uri'

class Scraper
    def initialize url
        @url = url
        @page = get_page
    end

    def get_infos
        {
            "title" => get_title,
            "description" => get_meta('og:description'),
            "image_url" => get_meta('og:image'),
            "url"  => canonical,
            "site_name" => site_name,
            "twitter_handle" => get_meta('twitter:site'),
        }
    end

    def get_meta property
        if node = @page.search("[property='#{property}'], [name='#{property}']").first
            node.attribute('content').value
        end
    end
    
    def get_title
        get_meta('og:title').try(:strip) || @page.search('title').try(:text) || 'Undefined title'
    end

    def get_page
        Nokogiri::HTML(open(@url))   
    end

    def site_name
        get_meta('og:site_name')
    end

    def canonical
        begin
            @page.search('link[rel="canonical"]').first.attributes['href'].value
        rescue
            @url
        end
    end

    def is_bandcamp?
        /bandcamp/.match(get_meta("twitter:site"))
    end
end