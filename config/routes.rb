DiggersDelights::Application.routes.draw do
  

  

  resources :playlists
  get 'static/modaljs'
  resources :links

  match "links" => "links#index", via: [:options]

  scope :api do
    resources :playlists
    resources :cliques
    get '/cliques/:id/join' => "cliques#join"
    
    resources :links do 
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
    root "pages#home"
    get "inside", to: "pages#inside", as: :inside
    get "home", to: "pages#home", as: "home"
    get "/contact", to: "pages#contact", as: "contact"
    post "/emailconfirmation", to: "pages#email", as: "email_confirmation"

    

    devise_for :users, controllers: {
        registrations: 'users/registrations',
        confirmations: 'users/confirmations',
    }
    get 'welcome', to: 'users#onboarding', as: :onboarding

  end
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  get '*path', to: "application#fallback_index_html", as: :app, constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end
