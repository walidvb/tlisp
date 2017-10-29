require 'oembed'
OEmbed::Providers.register_all
class PlisOEmbed
    def self.get url
        OEmbed::Providers.get(url)
    end
end
