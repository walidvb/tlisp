class CuratedListController < ApplicationController

  def show
    source = params[:url]
    scraped = CuratedListScraper.new(source)
    
    if false && @curated_list = CuratedList.find_by_source(scraped.canonical)
      render json: @curated_list
    else
      creator = CreateCuratedList.new(scraped)
      creator.save
      render json: creator.curated_list
    end
  end
end
