class CreateCuratedList

  def initialize curated_list, sources = nil
    @curated_list = curated_list
    @sources = sources
    return self
  end

  def add_sources notify: false, get_canonical: true
    iframe_sources.each do |url|
      fetch_single_link(url, get_canonical: get_canonical)
    end
    if notify
      emoji = %w{🌴 🏖 👍 🤘 🎉 ✌🏻 👌 🤷‍♂️ 💫 🔥 🌈 📻 🛀🏿}.sample
      listen_url = "http://www.diggersdelights.net/curated/#{@curated_list.id}"
      tweet_text = "#{emoji} #{@curated_list.title} from #{@curated_list.twitter_handle || @curated_list.site_name} now listenable in one go via #{listen_url}".gsub('*', '')
      DDTwitter.post tweet_text
    end
  end
  handle_asynchronously :add_sources, priority: 100


  def self.manually url, sources, private: false
    scraped = CuratedListScraper.new(url)
    curated_list = CuratedList.create(
      {
        url: scraped.canonical,
        host: scraped.site_name,
        private: private,
      }.merge(scraped.get_infos)
    );
    CreateCuratedList.new(curated_list, sources).add_sources(notify: true);
  end
  
  private

  def iframe_sources
    (@sources || CuratedListScraper.new(@curated_list.url).get_iframes)
  end

  def fetch_single_link url, get_canonical
    begin
      canonical_url = get_canonical ? Scraper.new(url).canonical : url
      link = Link.find_or_initialize_by(url: canonical_url)
      @curated_list.links << link
      link.save
      if link.oembeddable?
        CuratedListChannel.broadcast_to @curated_list, link.as_json
      end
    rescue ActiveRecord::RecordNotUnique => e
    rescue => e
      puts "Error scraping #{url} for #{@curated_list.id}"
      puts e
      ::Slack.log(text: "Error Scraping #{url}, from #{@curated_list.id}: #{e.inspect}")
      CuratedListChannel.broadcast_to @curated_list, {code: 'error', message: e.inspect, url: url}
    end
  end
  
end