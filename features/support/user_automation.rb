module UserAutomation
  include Warden::Test::Helpers
  Warden.test_mode!

  def create_visitor(opts = {})
    @visitor ||= {
      :name => "Testy McUserton",
      :email => "tester@789test.com",
      :password => "changeme",
      :password_confirmation => "changeme",
    }.merge(opts)
  end

  def make_visitor_unconfirmed
    update_visitor({ confirmed_at: nil })
  end

  def update_visitor(options)
    @visitor = @visitor.merge(options)
  end

  def create_user(opts = {})
    create_visitor(opts)
    delete_user
    @user = Fabricate(:user, @visitor)
  end

  def delete_user
    User.where(email: @visitor[:email]).destroy_all
  end

  def sign_up
    delete_user
    visit root_path
    click_on 'Sign up'
    wait_for_ajax
    ng do
      expect(page).to have_content('Sign up with Email')
    end
    click_on 'Sign up with Email'
    fill_in_sign_up_form
    wait_for_ajax
  end

  def fill_in_sign_up_form
    fill_in "user_name", :with => @visitor[:name]
    fill_in "user_email", :with => @visitor[:email]
    fill_in "user_password", :with => @visitor[:password]
    fill_in "user_password_confirmation", :with => @visitor[:password_confirmation]
    click_button "Join the Pigeonhole"
    wait_for_ajax
    find_user
  end

  def sign_in
    visit root_path
    click_on 'Log in'
    fill_in_sign_in_form
    @current_user = @user
  end

  def sign_in_as user
    # login_as doesn't seem to work with second Capybara sessions. No investigation has been made.
    click_on 'Log in'
    wait_for_ajax
    expect(page).to have_content('Not part of')
    fill_in_sign_in_form({email: user[:email], password: "changeme"})
    @current_user = user
    wait_for_ajax
    ng do
      expect(page).not_to have_content('Log in')
    end
  end

  def create_user_and_sign_in(opts={})
    create_user(opts)
    login_as(@user, :scope => :user, :run_callbacks => false)
    @current_user = @user
  end

  def sign_out
    visit '/users/sign_out'
  end


  def fill_in_sign_in_form(credentials=nil)
    wait_for_ajax
    credentials ||= @visitor
    expect(page).to have_content("Log in with Email")
    click_on "Log in with Email"
    expect(page).to have_content("Not part of The Pigeonhole yet?")
    fill_in "user_email", :with => credentials[:email]
    fill_in "user_password", :with => credentials[:password]
    click_button "Log in"
  end

  def ensure_user
    @user ||= create_user
  end
end
World(UserAutomation)
