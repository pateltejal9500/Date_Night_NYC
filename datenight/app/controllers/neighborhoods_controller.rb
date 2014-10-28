class NeighborhoodsController < ApplicationController
  before_action :authorize_user

  def index
    respond_to do |format|
    format.json {render :json => Neighborhood.all}
    end 

  end
  
  private

    def authorize_user
    @user = User.find_by(id: session[:user_id])
    unless @user
      redirect_to '/login'
    end
  end
end