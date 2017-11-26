When("I post a link") do
    visit new_link_path(modal: "1", href: "https://www.youtube.com/watch?v=8QZ8-OCrB5s")
    click_on "Save"
    expect(Link.count).not_to eq(0)
    @link = Link.last
    expect(@link).not_to be_nil
end

Then("I can see the link") do
  visit links_path
  expect(page).to have_content(@link.title)
end