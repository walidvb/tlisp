Given("I have a playlist") do
  @playlist = Fabricate(:playlist, user: @user)
end

When("I post a link to the playlist") do
  visit new_link_path(modal: "1", href: "https://www.youtube.com/watch?v=8QZ8-OCrB5s")
  select(@playlist.name, from: "Playlist")
  click_on("Save")
  @link = Link.last
  expect(@link).not_to be_nil
end

When("I visit my playlist") do 
    visit playlist_path(@playlist)
end

Then("I should see the link") do
  expect(page).to have_content(@link.title)
end

Then("I should see my playlists on my playlists page") do
  visit playlists_path
  @playlists.each do |pl|
    expect(page).to have_content(pl.name)
  end
end