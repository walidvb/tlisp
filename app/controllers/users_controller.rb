class UsersController < ApplicationController
  
  before_action :authenticate_user!

  def index
    @users = current_user.cliques.map(&:users).flatten.uniq.select{|u| u.id != current_user.id}

    # remove users with no names or initials as this endoint is currently only used for mentioning at the moment
    @users = @users.select{|u| !(u.initials.blank? && u.name.blank?)}
    render json: {
        users: @users,
    }
  end

    def onboarding
      @user = current_user
      params[:play]
    end
end
