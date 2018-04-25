
Rails.application.routes.draw do
  root to: 'pages#home' 
  # GET request to /about,  rails goes to pages controller, looks up 'about' action (AKA METHOD/FUNCTION)
  get 'about', to: 'pages#about'
  resources :contacts
  get 'contact-us', to: 'contacts#new'
end