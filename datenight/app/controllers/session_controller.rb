class SessionController < ApplicationController

	def new
		render :index
	end

	def create
		@user = User.find_by(email: params[:email])
		if @user && @user.authenticate(params[:password])
			session[:user_id] = @user.id
			redirect_to '/users/'+@user.id.to_s
		else 
			@error = true
			render :index
		end
	end

	def destroy
		reset_session
		redirect_to '/login'
	end

end