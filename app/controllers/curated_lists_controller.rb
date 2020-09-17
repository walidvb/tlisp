class CuratedListsController < ApplicationController

  before_action :cors_preflight_check
  after_action :cors_set_access_control_headers

  def create
    sources = params[:sources]
    create_or_show sources
    render json: {
      curated_list: @curated_list,
      links: @curated_list.links.map(&:as_json)
    }
  end

  def index
    @curated_lists = CuratedList.order('created_at DESC').public_.first(20)
    render json: {
      curated_lists: @curated_lists
    }
  end

  def show
    @curated_list = CuratedList.find(params[:id])
    if @curated_list.private? && !user_signed_in?
      head :unauthorized
      return
    end
    render json: {
      curated_list: @curated_list,
      links: @curated_list.links.order("curated_list_links.position ASC").oembeddable.map(&:as_json)
    }
  end

  def by_url
    sources = params[:sources]
    create_or_show sources
    if @error
    else
      redirect_to "/curated/#{@curated_list.id}"
    end
      
  end
  
  def create_or_show sources = nil
    @error = true
    ActiveRecord::Base.transaction do
      url = params[:url]
      title = params[:title]
      scraped = CuratedListScraper.new(url, title: title)
      iframes_count = scraped.get_iframes.count
      if iframes_count < 3 && (sources.nil? || sources.count < 3)
        count = iframes_count || (!sources.nil? && sources.count < 3)
        render json: { error: "This page only contains #{count} player#{count == 1 ? '' : 's'}, are we really that lazy?"}, status: :bad_request
        return
      end
      if @curated_list = CuratedList.find_by_url(scraped.canonical)
        # try to add the sources again, in case it had not worked the first time
        # and reverse them i think
        CreateCuratedList.new(@curated_list, sources: sources.reverse, title: title).add_sources(notify: true)
      else
        @curated_list = CuratedList.create(
          {
            url: scraped.canonical,
            host: scraped.site_name,
          }.merge(scraped.get_infos)
        )
        Slack.log text: "New Curated List for #{scraped.canonical}! 🔥"
        CreateCuratedList.new(@curated_list, sources: sources, title: title).add_sources(notify: true)
      end
      @error = false
    end
  end

  private
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Token'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version, Token'
      headers['Access-Control-Max-Age'] = '1728000'
      puts "cors_preflight_check"
      head :ok
    end
  end
end
