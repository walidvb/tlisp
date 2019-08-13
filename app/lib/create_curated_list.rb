class CreateCuratedList

  def initialize page
    @curated_list = CuratedList.new(
      {
        source: page.canonical,
        host: page.site_name,
      }.merge(page.get_infos)
    )
  end

  def save
    @curated_list.save! 
  end
end