class ActivitiesController < ApplicationController
  def create
    @user = User.find_by(id: session[:user_id])
      if @user
      activity = Activitie.create(date: params[:date], neighborhood_id: params[:neighborhood_id].to_i, user_id: @user.id, done: false] )
      respond_to do |format|
      format.json {render :json => activity}
      format.html{render '/plans'}
    end
  else
    redirect_to '/login'
  end


  end


end