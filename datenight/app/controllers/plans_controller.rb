class PlansController < ApplicationController
    def index
    @user = User.find_by(id: session[:user_id])
    if @user 
      respond_to do |format|
      format.json {render :json => @user, :include =>:plans}
      format.html {render :index}
    end
    else
      redirect_to '/login'
    end
  end
end