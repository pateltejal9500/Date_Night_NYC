Rails.application.routes.draw do
root 'welcome#index'

get '/login'=>'session#new'
post "/session"=>'session#create'
delete "/session"=>'session#destroy'

post '/users'=>'user#create'
delete '/users'=>'user#destroy'

get '/activities'=>'activities#index'
post '/activities'=>'activities#create'
delete '/activities/:id'=>'activities#destroy'
 


post '/plans'=>'plans#create'
get '/plans/:id'=>'plans#show'
get '/plans'=>'plans#index'
get '/plans/:id/edit'=>'plans#edit'
put '/plans/:id' =>'plans#update'
delete '/plans/:id'=>'plans#destroy'


get '/histories'=>'histories#index'
post '/histories'=>'histories#create'





end
