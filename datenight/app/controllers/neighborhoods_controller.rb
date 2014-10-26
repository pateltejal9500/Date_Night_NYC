class NeighborhoodsController < ApplicationController

  def index
    respond_to do |format|
    format.json {render :json => Neighborhood.all}
    end 

  end
end