Rails.application.routes.draw do
root 'session#index'

get '/login'=>'session#new'
post "/session"=>'session#create'
delete "/session"=>'session#destroy'

get '/users/:id'=>'users#show'
post '/users'=>'users#create'
delete '/users'=>'users#destroy'

get '/activities'=>'activities#index'
post '/activities'=>'activities#create'
delete '/activities/:id'=>'activities#destroy'

post '/plans'=>'plans#create'
get '/plans/:id'=>'plans#show'
get '/homepage'=>'plans#index'
get '/plans/:id/edit'=>'plans#edit'
put '/plans/:id' =>'plans#update'
delete '/plans/:id'=>'plans#destroy'


get '/neighborhoods' =>'neighborhoods#index'

get '/events'=>'events#index'


end
