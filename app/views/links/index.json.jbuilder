json.array!(@links) do |link|
  json.extract! link, :id, :url, :thumbnail_url, :width, :height, :title, :tag_list, :provider_name, :html
  json.url link_url(link, format: :json)
end
