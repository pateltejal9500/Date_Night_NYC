class PlansController < ApplicationController
  before_action :authorize_user

  def index
    respond_to do |format|
      format.json {render :json => @user, :include =>:plans}
      format.html {render :index}
    end
  end

  def create
    plan = Plan.create(date: params[:date].to_date, neighborhood_id: params[:neighborhood_id].to_i, user_id: @user.id, done: false )
    respond_to do |format|
      format.json {render :json => plan}
      format.html{render '/plans'}
    end
  end

  def show
    plan = Plan.find(params[:id])
    respond_to do |format|
      format.json {render :json => plan, :include => :activities}
      format.html{render '/plans'}
    end
  end


  def destroy
    plan = Plan.find(params[:id])
    plan.destroy 
    respond_to do |format|
      format.json {render :json => Plan.all}
      format.html{render '/plans'}
    end
  end

  def update
    plan = Plan.find(params[:id])
    newplan = {done: params[:done], comment: params[:comment], rating: params[:rating].to_i }
    plan.update(newplan)
    respond_to do |format|
      format.json {render :json => Plan.all}
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