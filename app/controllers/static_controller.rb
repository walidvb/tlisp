class StaticController < ApplicationController
  skip_before_filter :verify_authenticity_token, :modaljs

  def modaljs
    headers['Access-Control-Allow-Origin'] = '*'
    @domain = ENV['DOMAIN']
    render layout: false, :content_type => Mime::JS
  end
end
