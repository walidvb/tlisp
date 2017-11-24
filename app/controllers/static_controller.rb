class StaticController < ApplicationController
  skip_before_filter :verify_authenticity_token, :modaljs

  def modaljs
    headers['Access-Control-Allow-Origin'] = '*'
    @domain = Rails.env.test? ? "#{Capybara.current_session.server.host}:#{Capybara.current_session.server.port}" : ENV['DOMAIN']
    render layout: false, :content_type => Mime::JS
  end
end
