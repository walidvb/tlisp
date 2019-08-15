module Slack
  def self.log options = {}
    self.post! ENV['DD_SLACK_LOG_WEBHOOK_URL'], options
  end

  def self.post! url, payload
    if Rails.env.production?
      begin
        RestClient.post(url, payload.to_json)
      rescue => e
        puts "Error slacking to #{url}, #{payload.to_json}: #{e.inspect}"
      end
    elsif Rails.env.development?
      puts "Posting to slack #{payload.inspect}"
    end
  end
end