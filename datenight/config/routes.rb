Rails.application.routes.draw do
  root 'session#index'

  get '/login'=>'session#new'
  post "/session"=>'session#create'
  delete "/session"=>'session#destroy'

  post '/users'=>'users#create'

  post '/activities'=>'activities#create'

  post '/plans'=>'plans#create'
  get '/plans/:id'=>'plans#show'
  get '/plans'=>'plans#index'
  put '/plans/:id' =>'plans#update'
  delete '/plans/:id'=>'plans#destroy'

  get '/neighborhoods' =>'neighborhoods#index'

  get '/events'=>'events#index'

  get '/messages'=>'messages#index'

end
