require 'oembed'
OEmbed::Providers.register_all
class DDOEmbed
    def self.get url
        begin
            OEmbed::Providers.get(url)
        rescue => e
            puts e
        end
    end
end
