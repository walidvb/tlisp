class CreateCuratedList

  def initialize page, sources = nil
    @curated_list = 
    @sources = sources
    return self
  end

  def add_sources
    iframe_sources.each do |url|
      fetch_single_link(url)
    end
  end
  handle_asynchronously :add_sources, priority: 100

  private

  def iframe_sources
    (@sources || CuratedListScraper.new(@curated_list.url).get_iframes).select do |src|
      /^https?:\/\/[^\/]*.(facebook.com|twitter.com|google.com)/.match(src).nil?
    end
  end

  def fetch_single_link url
    begin
      scraped = Scraper.new(url)
      link = Link.find_or_create_by(url: scraped.canonical)
      @curated_list.links << link
      CuratedListChannel.broadcast_to @curated_list, link.as_json
    rescue => e
      puts "Error scraping #{url}"
      puts e
      CuratedListChannel.broadcast_to @curated_list, {code: 'error', message: e.inspect, url: url}
    end
  end
  handle_asynchronously :fetch_single_link, priority: 100
  
end