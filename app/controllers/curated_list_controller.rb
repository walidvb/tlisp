class CuratedListController < ApplicationController

  def show
    url = params[:url]
    scraped = CuratedListScraper.new(url)
    
    if @curated_list = CuratedList.find_by_url(scraped.canonical)
      render json: {
        curated_list: @curated_list,
        links: @curated_list.links.map(&:as_json)
      }
    else
      creator = CreateCuratedList.new(scraped)
      creator.save
      render json: {
        curated_list: creator.curated_list
      }
    end
  end
end
