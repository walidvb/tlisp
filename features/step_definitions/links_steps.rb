When("I post a link") do
    visit inside_path
    expect(page.current_path).to eq(inside_path)
    click_on "Bookmarklet"
    expect(page).to have_css('#diggersdelights')
    # pretend we're on another page
    page.execute_script(%{
        $('#diggersdelights #link_url').val('http://shop.mentalgroove.ch/album/sao-paulo');
    })
    within '#diggersdelights' do 
        click_on "Save"
    end
    wait_for_ajax
    expect(page).not_to have_css('#diggersdelights')
    expect(Link.count).not_to eq(0)
    @link = Link.last
    expect(@link).not_to be_nil
end

Then("I can see the link") do
  visit links_path
  expect(page).to have_content(@link.title)
end