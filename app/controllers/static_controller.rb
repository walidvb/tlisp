class StaticController < ApplicationController
  skip_before_filter :verify_authenticity_token, :modaljs

  def modaljs
    headers['Access-Control-Allow-Origin'] = '*'
    render layout: false, :content_type => Mime::JS
  end
end
