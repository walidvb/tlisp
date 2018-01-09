module Slack
    def self.post! url, payload
        if true || Rails.env.production?
            RestClient.post(url, payload.to_json)
        elsif Rails.env.development?
            puts "Posting to slack #{payload.inspect}"
        end
    end
end