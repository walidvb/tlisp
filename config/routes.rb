DiggersDelights::Application.routes.draw do
  

  resources :playlists
  get 'static/modaljs'
  resources :cliques
  get '/cliques/:id/join' => "cliques#join", as: :join_clique
  resources :links
  match "links" => "links#create", via: [:options]
  
  scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
    root "pages#home"
    get "inside", to: "pages#inside", as: :inside
    get "home", to: "pages#home", as: "home"
    get "/contact", to: "pages#contact", as: "contact"
    post "/emailconfirmation", to: "pages#email", as: "email_confirmation"


    devise_for :users, controllers: {
        registrations: 'users/registrations',
        confirmations: 'users/confirmations',
      } do 
      end
    get 'onboarding', to: 'user#onboarding', as: :onboarding

  end
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
end
