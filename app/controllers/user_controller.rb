class UserController < ApplicationController
  before_action :authenticate_user!
  def onboarding
    @user = current_user
  end
end
