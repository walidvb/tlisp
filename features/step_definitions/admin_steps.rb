# Steps visiting all pages

Given(/^there is one of each model$/) do
  @user = Fabricate :user
  @book = Fabricate :book
  @schedule = Fabricate(:schedule, book: @book)
  @user.subscribe_to_schedule! @schedule
  @discount = Fabricate :discount, user: @user
  @discount_token = Fabricate :discount_token
  @splash_page = Fabricate :splash_page, book: @book
  @email = Fabricate :email
  @home_page = HomePage.default
  @home_page.save!
  @comment = Comment.create!(commentable: @book, :user => @user, :holder => @user, :raw_content => "hello", schedule: @schedule, book: @book)
  @charge = Fabricate :charge, book: @book, user: @user
  @competition = Fabricate(:competition, book: @book)
  @optimizely_experiment = OptimizelyExperiment.create!(:experiment_id => "12345", :active => true, :title => "some exp" )
end

And(/^I visit all admin pages$/) do
	visit admin_book_path @book
	expect(page).not_to have_content("Login")
  visit edit_admin_book_path @book
  visit admin_books_path

  visit admin_user_path @user
  visit edit_admin_user_path @user
  visit admin_users_path
  click_on 'CSV'
  #visit admin_book_comments_path

  visit admin_discount_path @discount
  visit edit_admin_discount_path @discount
  visit admin_discounts_path

  visit admin_discount_token_path @discount_token
  visit edit_admin_discount_token_path @discount_token
  visit admin_discount_tokens_path

  visit admin_home_page_path @home_page
  visit edit_admin_home_page_path @home_page
  visit admin_home_pages_path

  visit admin_charge_path @charge
  visit edit_admin_charge_path @charge
  visit admin_charges_path

  visit admin_discount_token_path @discount_token
  visit edit_admin_discount_token_path @discount_token
  visit admin_discount_tokens_path

  visit admin_competition_path @competition
  visit edit_admin_competition_path @competition
  visit admin_competitions_path

  visit admin_email_path @email
  visit edit_admin_email_path @email
  visit admin_emails_path

  visit admin_optimizely_experiments_path
end

Then(/^it doesn't break$/) do
  expect(0).to eq(0)
end

Given(/^I add extra content to chapter (\d+), paragraph (\d+)$/) do |cid, pid|
  @chapter = @book.chapters[cid.to_i-1]
  visit book_web_reads_path(@book, chapter_index: @chapter.position+1)

  expect(page).to have_content(@book.title)
  click_on 'Edit extra content', visible: false
  expect(page).to have_css("[data-pid='#{pid}'] .extra-content-adder", visible: false)
  find("[data-pid=\'#{pid}\'] .extra-content-adder", visible: false).click
  wait_for_ajax
  expect(page).to have_css('#modal-window')
  within('#modal-window') do
    chosen_select 'link', from: '#tile_type'
    find('#modal-window .next-form.pigeon').click
    fill_in :tile_body, with: "http://thepigeonhole.com", visible: false
    click_on "Create Extra Content"
  end
  wait_for_ajax
  @tile = Tile.last
  expect(@tile).not_to be_nil
end

Then(/^chapter (\d+), paragraph (\d+) should show an extra content marker$/) do |cid, pid|
  chapter_id = @book.chapters[cid.to_i - 1].id
  expect(@tile.chapter_id).to eq(chapter_id)
  expect(@tile.paragraph_id).to eq(pid.to_i)
end

When(/^I feature this comment$/) do
  visit admin_book_comments_path(@book)
  click_on 'Feature on book page'
end
