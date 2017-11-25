require 'rails_helper'

RSpec.describe UserController, type: :controller do

  describe "GET #onboarding" do
    it "returns http success" do
      get :onboarding
      expect(response).to have_http_status(:success)
    end
  end

end
