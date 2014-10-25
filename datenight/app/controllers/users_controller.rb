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



end