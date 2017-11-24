require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module DiggersDelights
  class Application < Rails::Application

    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value.to_s
      end if File.exists?(env_file)
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de

    # turn off warnings triggered by friendly_id
    I18n.enforce_available_locales = false

    # Test framework
    config.generators.test_framework false

    # autoload lib path
    config.autoload_paths += %W(#{config.root}/lib)
    config.autoload_paths += Dir["#{config.root}/lib/**/"]

    # don't generate RSpec tests for views and helpers
   config.generators do |g|
     g.test_framework :rspec, fixture: true
     g.fixture_replacement :fabrication
     g.view_specs false
     g.helper_specs false
     g.assets = false
     g.helper = false
   end
   config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
   config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
   config.assets.paths << Rails.root.join('node_modules')
   
   config.assets.precompile += ['application.css, application.js', 'remote.js', 'modal.css']
   #DEPRECATION WARNING: Currently, Active Record suppresses errors raised within `after_rollback`/`after_commit` callbacks and only print them to the logs. In the next version, these errors will no longer be suppressed. Instead, the errors will propagate normally just like in other Active Record callbacks.
   config.active_record.raise_in_transactional_callbacks = true
  end

end
