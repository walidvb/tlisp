source 'https://rubygems.org'
ruby '2.6.6'

# Standard Rails gems
gem 'rails', '5.2.3'
# gem 'rails', '4.2.10'
gem 'uglifier'
gem 'jquery-rails'#, '4.0.4'
gem 'turbolinks'
gem 'jbuilder'#, '2.3.0'
gem 'sass-rails'
gem 'sprockets'#, '>= 3.0.0'
gem 'sprockets-es6'
gem 'redis'
gem 'bcrypt', '3.1.10'
gem 'haml-rails'
# version blocked because of https://github.com/rails/rails/issues/31673
gem 'pg'#, '~> 0.21'
gem 'puma'
gem 'webpacker', '~> 4.x'

gem 'font-awesome-sass'
gem 'bootstrap-sass'
gem "autoprefixer-rails"

# helpers
gem 'kaminari'
gem 'friendly_id', '5.1.0'
gem 'rest-client'
gem 'nokogiri'
gem 'delayed_job'
# functionality
gem 'devise'#, '~>4.1.0'
# gem "paperclip", '~> 4.1'
gem 'acts_as_list'
gem 'acts-as-taggable-on'#, '~> 4.0.0' 
gem 'ruby-oembed'
gem 'activity_notification'
gem 'rails_admin'
gem 'twitter'

gem 'delayed_job_active_record'
#### I18n
# gem 'rails-i18n', '~> 4.0.0'
# gem 'globalize'
# gem 'rails_admin_globalize_field'

group :development, :test do
  gem 'foreman'
  gem 'spring', '1.3.6'
  gem 'fabrication'
  gem 'binding_of_caller'
  # gem 'jazz_hands2'
  # gem 'figaro'# , '0.7.0'     # env variables
end

group :test do
  gem 'rspec-rails'#, '~> 3.5', '>= 3.5.2'
  gem 'rspec-collection_matchers'
  gem 'capybara'
  gem 'cucumber-rails', :require=>false
  gem 'database_cleaner', '1.0.1'
  gem 'email_spec'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'chromedriver-helper'
  gem 'poltergeist'
  gem 'chronic'
  gem 'timecop'
  gem 'anticipate'
  gem 'rspec-html-matchers'
  gem 'show_me_the_cookies'
  gem 'fuubar'
  gem 'hashie'
end

group :development do
  gem 'better_errors'
  gem 'awesome_print'
  gem 'binding_of_caller', :platforms=>[:mri_19, :mri_20, :rbx]
  gem 'web-console'#, '2.1.3'
  #gem 'guard-bundler'
  # gem 'quiet_assets'
  gem 'pry-rails'
  gem 'letter_opener'
  gem 'bullet'
  gem "rails-erd"
  # gem 'meta_request'
end

# Rails 12factor for Heroku: https://github.com/heroku/rails_12factor
group :production do
  gem 'rails_12factor'
  gem 'dalli'
  gem 'memcachier'
end
