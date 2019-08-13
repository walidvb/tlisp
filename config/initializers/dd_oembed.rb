require 'oembed'
OEmbed::Providers.register_all


mixcloud_provider = OEmbed::Provider.new("https://www.mixcloud.com/oembed/.{format}")
mixcloud_provider << "https://mixcloud.com/*"


OEmbed::Providers.register_fallback(
  OEmbed::ProviderDiscovery,
  OEmbed::Providers::Noembed
)
class DDOEmbed
    def self.get url
        return dummy_get if !Rails.env.production?

        begin
            OEmbed::Providers.get(url).fields
        rescue OEmbed::NotFound => e
            p "#{e}: #{url}"
            # need to create a bandcamp to detect source
            begin 
                oembed = BandcampOembed.new(url) 
                if oembed.is_bandcamp?
                    return oembed.get_oembed
                end
            rescue => e
                puts "other error #{e}"
                raise e
            end
        end
    end

    def self.dummy_get
        {
            "version" => "1.0",
            "author_name" => "Brownswood Recordings",
            "width" => 480,
            "title" => "Yussef Kamaal - Black Focus (Full Album Upload)",
            "thumbnail_url" => "https://i.ytimg.com/vi/4D8YPDdsxYU/hqdefault.jpg",
            "html" => "<iframe width=\"480\" height=\"270\" src=\"https://www.youtube.com/embed/4D8YPDdsxYU?feature=oembed\" frameborder=\"0\" gesture=\"media\" allow=\"encrypted-media\" allowfullscreen></iframe>",
            "provider_name" => "YouTube",
            "thumbnail_height" => 360,
            "author_url" => "https://www.youtube.com/user/BrownswoodRecs",
            "provider_url" => "https://www.youtube.com/",
            "type" => "video",
            "height" => 270,
            "thumbnail_width" => 480
        }
    end
end
