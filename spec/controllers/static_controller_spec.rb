require 'spec_helper'

describe StaticController do

  describe "GET 'modaljs'" do
    it "returns http success" do
      get 'modaljs'
      response.should be_success
    end
  end

end
