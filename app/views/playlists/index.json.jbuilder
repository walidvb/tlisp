json.array!(@playlists) do |playlist|
  json.extract! playlist, :id, :user_id, :name, :slug
  json.url playlist_url(playlist, format: :json)
  json.links do 
    json.array!(playlist.links.recent) do |link|
      json.extract! link, :thumbnail_url
    end
  end
end
