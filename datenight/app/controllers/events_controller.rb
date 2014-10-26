class EventsController < ApplicationController

  def index
    zip = params[:zip].to_i
    
    results = Yelp.client.search(zip, {term: "restaurants"})
    resultsMixed = results.businesses.shuffle
    first = resultsMixed[0]
    second = resultsMixed[1]
    third = resultsMixed[2]
    rest = [first,second,third]
    @user = User.find_by(id: session[:user_id])
    if @user
      respond_to do |format|
      format.json {render :json => rest}
      format.html{render :index}
    end
  else
    redirect_to '/login'
  end


  end
end