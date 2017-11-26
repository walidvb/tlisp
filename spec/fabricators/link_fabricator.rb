Fabricator(:link) do
    url {sequence(:url) {|i| "https://www.youtube.com/watch?v=rhGwsgF8jF0?#{i}"}}
end
