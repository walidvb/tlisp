Passsport::Application.routes.draw do
  get 'static/modaljs'

  resources :links
  scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
    root "pages#home"
    get "home", to: "pages#home", as: "home"
    get "/contact", to: "pages#contact", as: "contact"
    post "/emailconfirmation", to: "pages#email", as: "email_confirmation"


    devise_for :users

  end
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
end
