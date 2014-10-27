class EventsController < ApplicationController

  def index
    neighborhood = Neighborhood.find(params[:neighborhood])
    results = Yelp.client.search(neighborhood.name, {term: "restaurants"})
    resultsMixed = results.businesses.shuffle
    eventsshuffle = Event.all.shuffle

    firstevent = {hash: {name: eventsshuffle[0].name, mobile_url: eventsshuffle[0].url, rating: eventsshuffle[0].rating}}
    secondevent = {hash:{name: eventsshuffle[1].name, mobile_url: eventsshuffle[1].url, rating: eventsshuffle[1].rating}}

    first = resultsMixed[0]
    second = resultsMixed[1]
    third = resultsMixed[2]
    stuff = [first,second,third,firstevent, secondevent]
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