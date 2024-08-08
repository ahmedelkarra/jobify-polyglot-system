Rails.application.routes.draw do
  # Health check route
  get "up", to: "rails/health#show", as: :rails_health_check

  # Authentication routes
  post '/api/auth/register', to: 'register#register_form'
  post '/api/auth/login', to: 'login#login'
  get '/api/auth/me', to: 'user#company_info'
  put '/api/auth/me', to: 'user#company_update'
  delete '/api/auth/me', to: 'user#company_delete'
end
