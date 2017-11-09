require 'spec_helper'

describe Link do
  describe "uniqueness" do
    let(:url){ "http://youtube.com" }
    let :user do 
      Fabricate :user
    end
    let! :link do
      Fabricate :link, user: user, url: url
    end

    it "doesn't allow duplicate link for the same user" do
      @link_2 = Fabricate.build :link, user: user, url: url
      binding.pry
      expect(@link_2).not_to be_valid
    end
  end
end
