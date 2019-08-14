class CuratedListScraper < Scraper
  def get_iframes
    @page.search('iframe[src]').map do |iframe|
      add_missing_protocol(iframe.attributes['src'].value)
    end.select do |src|
      !/faebook\.com|twitter\.com|googletagmanager.com|google.com/.match(src)
    end.compact
  end

  def add_missing_protocol url
    if /^\/\/?/.match(url)
      return "https:#{url}"
    else
      return url
    end
  end
end