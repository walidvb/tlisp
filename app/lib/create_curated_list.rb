class CreateCuratedList

  def initialize page
    @page = page
    @curated_list = CuratedList.new(
      {
        url: page.canonical,
        host: page.site_name,
      }.merge(page.get_infos)
    )
    return self
  end

  def save
    @curated_list.save!
    fetch_links
  end

  def curated_list
    @curated_list
  end

  private
  def fetch_links
    begin
      links = CuratedListScraper.new(@curated_list.url).get_iframes
      links.each do |url|
        scraped = Scraper.new(url)
        link = Link.find_or_create_by(url: scraped.canonical)
        @curated_list.links << link
        CuratedListChannel.broadcast_to @curated_list, link.as_json
      end
    rescue => e
      CuratedListChannel.broadcast_to @curated_list, {
        code: 'error',
        error_message: e.inspect,
      }
    end
  end
  handle_asynchronously :fetch_links, priority: 100
end