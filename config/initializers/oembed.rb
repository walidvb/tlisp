require 'oembed'
OEmbed::Providers.register_all
class DDOEmbed
    def self.get url
        begin
            OEmbed::Providers.get(url).fields
        rescue OEmbed::NotFound
            oembed = BandcampOembed.new(url) 
            if oembed.is_bandcamp?
                # need to create a bandcamp to detect source
                return oembed.get_oembed
            end
        rescue => e
            puts e
            raise e unless Rails.env.test?
        end
    end
end
