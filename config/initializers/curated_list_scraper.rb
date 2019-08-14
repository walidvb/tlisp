class CuratedListScraper < Scraper
  def get_iframes
    @page.search('iframe[src]').map do |iframe|
      iframe.attributes['src'].value
    end.select do |src|
      !/faebook\.com|twitter\.com|googletagmanager.com|google.com/.match(src)
    end.compact
  end
end