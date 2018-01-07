class UsersController < ApplicationController
  
  before_action :authenticate_user!

  def index
    @users = current_user.cliques.map(&:users).flatten.uniq.select{|u| u.id != current_user.id}

    render json: {
        users: @users,
    }
  end

    def onboarding
      params[:play]
    end
end
