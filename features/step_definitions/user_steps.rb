When(/^I choose to sign up$/) do
  create_visitor
  click_on 'Sign up with Email'
  fill_in_sign_up_form
  fill_in_demographics
end

When(/^I choose to sign in$/) do
  ensure_user
  within '#the-form' do
    click_on 'Log in'
  end
  wait_for_ajax
  fill_in_sign_in_form
end

Given(/^I am not logged in$/)do
  visit '/users/sign_out'
end
Given(/^I log out$/)do
  visit '/users/sign_out'
end

Given(/^I am logged in$/) do
  create_user_and_sign_in(has_seen_welcome: true)
end

Given(/^I(?: am)? log(?:ged)? in as an? (\w+)$/) do |role|
  create_user_and_sign_in(has_seen_welcome: true, roles: role, publisher_list: [:pigeonhole])
end

Given(/^I am the publisher of a book$/) do
  create_user_and_sign_in(has_seen_welcome: true, roles: :publisher, publisher_list: [:pigeonhole])
    create_book(publisher: :pigeonhole)
end

Given(/^I am logged in without a card$/) do
  create_user_and_sign_in(has_seen_welcome: true, without_card: true)
end

Given(/^I exist as a user$/)do
  create_user
end

Given(/^I do not exist as a user$/)do
  create_visitor
  delete_user
end

Given(/^I am a facebook user$/) do
  @user.provider = 'facebook'
  @user.save!
end

When(/^I sign in with valid credentials$/)do
  create_visitor
  sign_in
end


When(/^I sign out$/) do
  sign_out
end

When(/^I sign up with valid user data$/)do
  create_visitor
  sign_up
end

When(/^I sign up with an invalid email$/)do
  raise "don't use this step"
end

When(/^I sign up without a password confirmation$/)do
  create_visitor
  update_visitor(:password_confirmation => "")
  sign_up successful: false
end

When(/^I sign up without a password$/)do
  create_visitor
  update_visitor(:password => "")
  sign_up successful: false
end

When(/^I sign up with a mismatched password confirmation$/)do
  create_visitor
  update_visitor(:password_confirmation => "changeme123")
  sign_up successful: false
end

When(/^I sign in with a wrong email$/)do
  update_visitor(:email => "wrong@example.com")
  sign_in
end

When(/^I sign in with a wrong password$/)do
  update_visitor(:password => "wrongpass")
  sign_in
end

When(/^I edit my email$/)do
  visit edit_user_registration_path
  fill_in "user_email", :with => "new@email.com"
  fill_in "current-password", :with => @visitor[:password]
  click_on "Update Profile Info"
end

Then(/^I should be signed in$/)do
  wait_for_ajax
  ng do
    page.should have_selector ('.user-icon')
  end
end

Then(/^I should be signed out$/)do
  ng do
    expect(page).to have_content(/Log in|Login|Join Now/i)
  end
end

#TODO: remove
Then(/^I should see an invalid email message$/) do
  expect(true).to be_falsy
end

Then(/^I should see a missing password message$/) do
  expect(page).to have_content "Password can't be blank"
end

Then(/^I should see a missing password confirmation message$/)do
  expect(page).to have_content "Password confirmation doesn't match"
end

Then(/^I should see a mismatched password message$/)do
  expect(page).to have_content "Password confirmation doesn't match"
end

Then(/^I see an invalid login message$/)do
  expect(page).to have_content "Invalid email or password."
end

When(/^I ask for my password to be reset$/) do
  visit root_path
  ensure_user
  click_on "Log in"
  wait_for_ajax
  ng do
    click_on 'Log in with Email'
  end
  click_on 'Forgot password?'
  expect(page).to have_content('I remember now')
  within '.reset-password' do
    fill_in('user_email', with: @user.email)
  end
  click_on 'Reset Password'
  wait_for_ajax
  expect(page).to have_content("Ready! We sent you an email with instructions. See you in a bit.")
end

When(/^I follow the link in the email$/) do
  ng do
    email = find_user.email
    open_email(email)
    visit_in_email("here")
  end
end

When(/^I enter a new password$/) do
  fill_in 'user_password', with: 'my-new-password'
  fill_in 'user_password_confirmation', with: 'my-new-password'
  click_on 'Change my password'
  page.should have_content("Your password was changed successfully. You are now signed in.")
end

Then(/^I can log in with my new password$/) do
  sign_out
  visit new_user_session_path
  fill_in_sign_in_form(email: find_user.email, password: 'my-new-password')
end

When(/^I visit my account settings$/) do
  visit "/users/edit"
end

Then(/^I should have received a password reset confirmation email$/) do
  email = unread_emails_for(find_user.email).find { |e| e.subject == "Your Pigeonhole password has changed" }
  email.should_not be_nil
end

Then(/^I should be on the home page$/) do
  page.current_path.should == root_path
end

When(/^I edit my credit card details with valid info$/) do
  visit edit_user_registration_path
  expect(page).to have_content('My Account')
  stripe_customer = Stripe::Customer.create(email: @user.email)
  stripe_customer.cards.create(card: {
    number: '4242424242424242',
    exp_month: 2,
    exp_year: 2.years.from_now.year,
    cvc: 123,
    address_line1: '123 Fake Street'
  })
  stripe_customer.save

  @user.stripe_customer_id = stripe_customer.id
  @user.save!

  @new_card_month = 4
  @new_card_year = 3.years.from_now.strftime('%y')

  page.execute_script %Q{
    document.querySelectorAll('.stripe-form')[0].scrollIntoView();
    $('.stripe-form input#card-number').val('4242424242424242');
    $('.stripe-form input#card-cvc').val('666');
    $('.stripe-form input#card-expiration').val('#{@new_card_month}/#{@new_card_year}');
    $('form.stripe-form').submit();
  }
end

Then(/^my new card should be used in subsequent purchases$/) do
  soon do
    stripe_customer = Stripe::Customer.retrieve(@user.stripe_customer_id)
    expect(stripe_customer.cards.first.exp_month).to eq(@new_card_month)
    expect(stripe_customer.default_card).to eq(stripe_customer.cards.first.id)
  end
end

Then(/^I should not see my profile and password form$/) do
  expect(page).not_to have_css('.profile-form')
  expect(page).not_to have_css('.password-form')
end

When(/^I edit my password$/) do
  visit edit_user_registration_path
  @new_password = 'secrettop'
  within '.password-form' do
    fill_in 'new-password', :with => @new_password
    expect(page).to have_content('Repeat new password')
    fill_in 'new-password-2', :with => @new_password
    fill_in 'current-password-2', :with => @user.password
  end
  @user.update!(:password => @new_password, :password_confirmation => @new_password)
  @user.save!
end

When(/^I sign in with my new password$/)do
  click_on "Log in"
  click_on "Log in with Email"
  fill_in "user_email", :with => @user[:email]
  fill_in "user_password", :with => @new_password
  click_button "Log in"
end

Then(/^my email should be updated$/) do
  expect(@user.reload.email).to eq('new@email.com')
end

When(/^I log back in as (\S+)$/) do |name|
  Capybara.session_name = name
  user = User.find_by_name(name)
  expect(user).not_to be_nil
  sign_out
  ng{ expect(page).to have_content('Log in') }
  sign_in_as user
end

When(/^I log in as (\S+)$/) do |name|
  Capybara.session_name = name
  user = User.find_by_name(name)
  expect(user).not_to be_nil
  visit root_path
  sign_in_as user
end

When(/^I sign in from the reader$/) do
  click_link('Log in', match: :first)
  wait_for_ajax
  fill_in_sign_in_form email: @user.email, password: 'changeme'
  wait_for_ajax
  expect(page).not_to have_content('Log in')
end
