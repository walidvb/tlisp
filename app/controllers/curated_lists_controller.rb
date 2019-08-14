class CuratedListsController < ApplicationController

  def index
    @curated_lists = CuratedList.order('created_at DESC').first(20)
    render json: {
      curated_lists: @curated_lists
    }
  end

  def show
    url = params[:url]
    scraped = CuratedListScraper.new(url)
    
    if @curated_list = CuratedList.find_by_url(scraped.canonical)
    else
      creator = CreateCuratedList.new(scraped)
      creator.save
      @curated_list = creator.curated_list
    end
    render json: {
      curated_list: @curated_list,
      links: @curated_list.links.map(&:as_json)
    }
  end
end
