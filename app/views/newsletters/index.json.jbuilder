json.array!(@newsletters) do |newsletter|
  json.extract! newsletter, :id
  json.url newsletter_url(newsletter, format: :json)
end
