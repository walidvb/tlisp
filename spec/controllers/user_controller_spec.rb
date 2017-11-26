require 'spec_helper'

describe UserController do
  before do
    request.env['warden'].stub :authenticate! => user
    controller.stub :current_user => user
  end
  
  let :user do 
    Fabricate :user
  end
  describe "GET #onboarding" do
    it "returns http success" do
      get :onboarding
      expect(response).to have_http_status(:success)
    end
  end

end
