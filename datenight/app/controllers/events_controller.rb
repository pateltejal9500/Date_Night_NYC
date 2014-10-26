class EventsController < ApplicationController

  def index
    neighborhood = Neighborhood.find(params[:neighborhood])


    
    results = Yelp.client.search(neighborhood.name, {term: "restaurants"})
    resultsMixed = results.businesses.shuffle
    first = resultsMixed[0]
    second = resultsMixed[1]
    third = resultsMixed[2]
  
   
  stuff = [first,second,third]

    rest = [first,second,third]
    @user = User.find_by(id: session[:user_id])
    if @user
      respond_to do |format|
      format.json {render :json => stuff}
      format.html{render '/plans'}
    end
  else
    redirect_to '/login'
  end


  end
end