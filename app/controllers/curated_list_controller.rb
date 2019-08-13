class CuratedListController < ApplicationController

  def show
    source = params[:source]
    scraped = CuratedListScraper.new(source)
    render json: {
      infos: scraped.get_infos,
      iframes: scraped.get_iframes
    }
    # if @creative_list = CuratedList.find_by_source(page.canonical)
    # else
    #   CreateCuratedList.call(page)
    # end
  end
end
