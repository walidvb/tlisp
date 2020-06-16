require 'open-uri'

class BandcampOembed < Scraper

    def get_oembed
        begin 
            build_oembed
        rescue => e
            puts "Failed getting #{url}: #{e}"
            raise e
        end
    end

    def build_oembed
        video_url = get_meta 'og:video'
        embed = build_iframe(video_url)
        description = @page.search('#trackInfo .bd').text()
        {
            "title" => get_meta('og:title').split(', by ')[0].strip,
            "description" => description,
            "thumbnail_url" => get_meta('og:image'),
            "html" => embed,
            "author_name" =>  get_meta('og:title').split(', by ')[1].strip,
            "height" => get_meta('og:video:height'),
            "width" => get_meta('og:video:width'),
            # author_url: 
            "provider_name" => "Bandcamp",
            "provider_url" => "https://bandcamp.com",
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
        "<iframe style='border: 0; width: 400px; height: 307px;' src='//bandcamp.com/EmbeddedPlayer/v=2/#{id_er}/size=large/bgcol=ffffff/linkcol=0687f5/transparent=true/artwork=small' seamless></iframe>"
    end
end