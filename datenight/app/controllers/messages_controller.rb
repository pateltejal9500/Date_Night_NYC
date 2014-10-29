class MessagesController < ApplicationController
  before_action :authorize_user

  def index
     @user = User.find_by(id: session[:user_id])
     if params[:email]
      email = params[:email]
      subject = "You have been invited!"
    else 
      email = @user.email
      subject = "Don't forget"
    end

    response = HTTParty.post "https://sendgrid.com/api/mail.send.json",
    :body => {
    "api_user" => ENV['SENDGRID_API_USER'],
    "api_key" => ENV['SENDGRID_API_password'],
    "to" => "#{email}",
    "from" => "#{@user.email}",
    "subject" => "#{subject}",
    "text" => "#{params[:information]}"
        };
      respond_to do |format|
      format.json { render :json => @user}
      format.html { render :index }
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
