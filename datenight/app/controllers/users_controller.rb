class UsersController < ApplicationController

	def create
		users = {
			fname: params["fname"],
			lname: params["lname"],
			email: params["email"],
			password: params["password"],
		}

		User.create(users)

		redirect_to "/login"
	end

	def show
		@user = User.find_by(id: session[:user_id])
		if @user && @user.id == params[:id].to_i
			respond_to do |format|
			format.json {render :json => @user, :include =>:plans}
			format.html {render :index}
		end
		else
			redirect_to '/login'
		end
	end

end