class StaticController < ApplicationController
  skip_before_filter :verify_authenticity_token, :modaljs

  def modaljs
    headers['Access-Control-Allow-Origin'] = '*'
    render raw: Rails.application.assets.find_asset('remote.js').to_s, layout: false, :content_type => Mime::JS
  end
end
