require 'spec_helper'

describe Link do
  describe "uniqueness" do
    let(:url){ "https://www.youtube.com/watch?v=8QZ8-OCrB5s" }
    let :user do 
      Fabricate :user
    end
    let! :link do
      Fabricate :link, user: user, url: url
    end

    it "doesn't allow duplicate link for the same user" do
      @link_2 = Fabricate.build :link, user: user, url: url
      expect(@link_2).not_to be_valid
    end
  end
end
