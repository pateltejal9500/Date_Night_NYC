class MessagesController < ApplicationController
  def index
     @user = User.find_by(id: session[:user_id])
     if params[:email]
      email = params[:email]
      subject = "You have been invited!"
    else 
      email = @user.email
      subject = "Don't forget"
    end

    if @user 
    response = HTTParty.post "https://sendgrid.com/api/mail.send.json", 
    :body => {
    "api_user" => "bdargan",
    "api_key" => "pjigglies915",
    "to" => "#{email}",
    "from" => "#{@user.email}",
    "subject" => "#{subject}",
    "text" => "#{params[:information]}"
        };
      respond_to do |format|
      format.json { render :json => @user}
      format.html { render :index }
    end
    
    else
      redirect_to '/login'
    end

  end
end 
