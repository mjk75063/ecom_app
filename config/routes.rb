
Rails.application.routes.draw do
  
  root to: 'pages#home' 
  devise_for :users, controllers: { registrations: 'users/registrations' }
  resources :users do 
    resource :profile
  end
  
  # GET request to /about,  rails goes to pages controller, looks up 'about' action (AKA METHOD/FUNCTION)
  get 'about', to: 'pages#about'
  resources :contacts, only: :create
  get 'contact-us', to: 'contacts#new'
  

end