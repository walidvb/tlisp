json.links do 
  json.array!(@links) do |link|
    json.extract! link, :id, :url, :thumbnail_url, :width, :height, :title, :tag_list, :provider_name, :html
    json.api_url link_url(link, format: :json)
    json.users do 
      json.array!(link.users.uniq) do |u|
        json.extract! u, :id, :name, :initials
      end
    end
  end
end
json.pagination do 
  json.total @pages_count
  json.current_page @current_page
  json.page_size @page_size
end
json.showExample @show_example