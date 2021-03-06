module DDTwitter
    @client = Twitter::REST::Client.new do |config|
        config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
        config.consumer_secret     = ENV["TWITTER_CONSUMER_SECRET"]
        config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
        config.access_token_secret = ENV["TWITTER_ACCESS_SECRET"]
    end

    def self.post tweet
        begin
            return if !Rails.env.production?
            @client.update(tweet)
        rescue => e
            puts "Error tweeting #{self.id}: #{e}"
        end
    end
end