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
end
