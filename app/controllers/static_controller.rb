class StaticController < ApplicationController
  def modaljs
    @script_url = "test"
    render layout: false
  end
end
