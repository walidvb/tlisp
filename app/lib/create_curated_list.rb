class CreateCuratedList

  def initialize curated_list, sources = nil
    @curated_list = curated_list
    @sources = sources
    return self
  end

  def add_sources options = { notify: false }
    iframe_sources.each do |url|
      fetch_single_link(url)
    end
    if options[:notify]
      emoji = %w{🌴 🏖 👍 🤘 🎉 ✌🏻 👌 🤷‍♂️ 💫 🔥 🌈 📻 🛀🏿}.sample
      listen_url = "http://www.diggersdelights.net/curated/#{@curated_list.id}"
      tweet_text = "#{emoji} #{@curated_list.title} from #{@curated_list.site_name} now listenable in one go via #{listen_url}".gsub('*', '')
      DDTwitter.post tweet_text
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
      ::Slack.log(text: "Error Scraping #{url}, from #{@curated_list.id}: #{e.inspect}")
      CuratedListChannel.broadcast_to @curated_list, {code: 'error', message: e.inspect, url: url}
    end
  end
  
end