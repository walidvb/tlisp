json.array!(@links) do |link|
  json.extract! link, :id, :url, :thumbnail_url, :width, :height, :title, :tag_list, :provider_name, :html
  json.api_url link_url(link, format: :json)
  json.users do 
    json.array!(link.users) do |u|
      json.extract! u, :id, :name, :initials
    end
  end
end
