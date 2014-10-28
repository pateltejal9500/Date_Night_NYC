class ActivitiesController < ApplicationController
  before_action :authorize_user
  def create
    @user = User.find_by(id: session[:user_id])
    activity = Activity.create(user_id: @user.id, plan_id: params[:plan_id].to_i, name: params[:name], url: params[:url], rating: params[:rating].to_i)
    respond_to do |format|
      format.json {render :json => activity}
      format.html{render '/plans'}
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