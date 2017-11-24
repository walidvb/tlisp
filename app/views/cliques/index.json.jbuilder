json.array!(@cliques) do |clique|
  json.extract! clique, :id
  json.url clique_url(clique, format: :json)
end
