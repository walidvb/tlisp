RailsAdmin.config do |config|

  config.main_app_name = [Rails.application.class.parent_name]

  ### Popular gems integration
  I18n.default_locale = :en
  I18n.available_locales = [:en]
  ## == Devise ==
  config.authenticate_with do
    warden.authenticate! scope: :user
  end
  config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration

  nested_only = %w{clique_membership}
  config.actions do
    dashboard do
      except nested_only
    end
    index do
      except nested_only
    end
    new do
    end
    export
    bulk_delete
    show
    edit
    delete do
      except nested_only
    end
    show_in_app do
      except nested_only
    end

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  ## == Globalize ==
  translated_models = []
  config.included_models = []

  ## == Globalize Translated Fields ==
  translated_models.each do |model|
    config.model "#{model}::Translation" do
      visible false
      configure :locale, :hidden do
        help ''
      end
      include_fields :locale, *Object.const_get(model).translated_attribute_names
    end
  end

end
