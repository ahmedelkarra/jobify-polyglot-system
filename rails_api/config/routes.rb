Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  post '/api/auth/register/' , to: 'register#register_form'
  post '/api/auth/login/' , to: 'login#login'
  get '/api/auth/me/' , to: 'user#company_info'
  put '/api/auth/me/' , to: 'user#company_update'
  delete '/api/auth/me/' , to: 'user#company_delete'
end
