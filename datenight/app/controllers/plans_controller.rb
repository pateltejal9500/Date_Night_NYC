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

  def create
    @user = User.find_by(id: session[:user_id])
    if @user
      plan = Plan.create(date: params[:date].to_date, neighborhood_id: params[:neighborhood_id].to_i, user_id: @user.id, done: false )
      respond_to do |format|
        format.json {render :json => plan}
        format.html{render '/plans'}
      end
    else
      redirect_to '/login'
    end
  end

  def show
    @user = User.find_by(id: session[:user_id])
    plan = Plan.find(params[:id])

    if @user
      respond_to do |format|
        format.json {render :json => plan, :include => :activities}
        format.html{render '/plans'}
      end
    else
      redirect_to '/login'
    end
  end


  def destroy
    @user = User.find_by(id: session[:user_id])
    plan = Plan.find(params[:id])
    plan.destroy
    if @user
      respond_to do |format|
        format.json {render :json => Plan.all}
        format.html{render '/plans'}
      end
    else
      redirect_to '/login'
    end
  end

  def update
    @user = User.find_by(id: session[:user_id])
    plan = Plan.find(params[:id])
    newplan = {done: params[:done], comment: params[:comment], rating: params[:rating].to_i }
    plan.update(newplan)
    if @user
      respond_to do |format|
        format.json {render :json => Plan.all}
        format.html{render '/plans'}
      end
    else
      redirect_to '/login'
    end
  end
end