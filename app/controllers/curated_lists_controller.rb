class CuratedListsController < ApplicationController

  def create
    sources = params[:sources]
    create_or_show sources
  end

  def index
    @curated_lists = CuratedList.order('created_at DESC').first(20)
    render json: {
      curated_lists: @curated_lists
    }
  end

  def show
    @curated_list = CuratedList.find(params[:id])
    render json: {
      curated_list: @curated_list,
      links: @curated_list.links.map(&:as_json)
    }
  end

  def by_url
    create_or_show
  end
  
  def create_or_show sources = nil
    url = params[:url]
    scraped = CuratedListScraper.new(url)

    if @curated_list = CuratedList.find_by_url(scraped.canonical)
      # try to add the sources again, in case it had not worked the first time
      CreateCuratedList.new(@curated_list, sources).add_sources
    else
      @curated_list = CuratedList.create(
        {
          url: scraped.canonical,
          host: scraped.site_name,
        }.merge(scraped.get_infos)
      )
      Slack.log text: "New Curated List for #{scraped.canonical}! 🔥"
      CreateCuratedList.new(@curated_list, sources).add_sources(notify: true)
    end
    render json: {
      curated_list: @curated_list,
      links: @curated_list.links.map(&:as_json)
    }
  end
end
