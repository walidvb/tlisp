Rails.application.routes.draw do

  resources :playlists
  get 'static/modaljs'
  resources :links

  match "links" => "links#index", via: [:options]

  get 'extension.js' => 'extension#show'
  scope :api do
    resources :curated_lists, only: [:create, :show, :index] do 
      collection do 
        get '/by-url' => 'curated_lists#by_url'
      end
    end

    resources :playlists
    resources :cliques do 
      get '/join' => "cliques#join", as: :join
    end
    
    resources :links do
      collection do 
        get 'like/status'
        post 'like/toggle' => 'like#toggle'
        get 'my_links' => 'links#my_links'
      end
      resources :plays, only: [:create]
    end
    get '/link_form_details.json' => 'links#link_form_details'

    resources :users, only: [:index]
    get '/notifications' => 'users/notifications_with_devise#index', devise_type: "user", target_type: "user"
    post '/notifications/:id/open' => 'users/notifications_with_devise#open', devise_type: "user", target_type: "user"

    notify_to :users, controller: 'users/notifications', with_devise: :users
    # devise_for :users, controllers: {
    #     registrations: 'users/registrations',
    # }, as: :api_devise

    resources :newsletters, only: [:create]
    # TODO move this to other controller
    get '/filters.json' => "links#filters"

    get '/me' => 'users#me'
    
    # static resources paths
    get '/covers' => 'pages#covers'

  end

  scope :iframe do 
    resources :newsletters
  end

  scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
    root "application#fallback_index_html"
    get "inside", to: "pages#inside", as: :inside
    get "home", to: "pages#home", as: "home"
    get "/contact", to: "pages#contact", as: "contact"
    post "/emailconfirmation", to: "pages#email", as: "email_confirmation"

    

    # TODO: move this into API
    devise_for :users, controllers: {
        registrations: 'users/registrations',
        confirmations: 'users/confirmations',
        sessions: 'users/sessions',
        passwords: 'users/passwords',
    }
    get 'welcome', to: 'users#onboarding', as: :onboarding

  end
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  

  # this is required for the OPTIONS preflight method to go through
  # https://gist.github.com/dhoelzgen/cd7126b8652229d32eb4#gistcomment-1856812
  match '*path', via: [:options], to:  -> (env) {
    current_origin = env['HTTP_ORIGIN']
    # currently accept requests from any page. 
    # maybe this should be restricted to youtube etc?
    [204, {
      'Access-Control-Allow-Headers' => "Origin, Content-Type, Accept, Authorization, Token", 
      'Access-Control-Allow-Credentials' => "true", 
      'Access-Control-Allow-Origin' => "#{current_origin}", 
      'Access-Control-Allow-Methods' => 'POST, GET, PUT, DELETE, OPTIONS',
      'Content-Type' => 'text/plain'
    }, []]
  }
  get '*path', to: "application#fallback_index_html", as: :app, constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
