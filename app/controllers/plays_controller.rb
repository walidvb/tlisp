class PlaysController < ApplicationController
  
  before_action :authenticate_user!
  # POST /plays
  # POST /plays.json
  def create
    @play = Play.new(link_id: params[:link_id], user_id: current_user.id)

    respond_to do |format|
      if @play.save
        format.json { render :show, status: :created }
      else
        format.json { render json: @play.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Never trust parameters from the scary internet, only allow the white list through.
    def play_params
      params[:play]
    end
end
