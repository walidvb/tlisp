require 'spec_helper'

describe Link do
  describe "uniqueness" do
    let(:url){ "https://www.youtube.com/watch?v=8QZ8-OCrB5s" }
    let :clique do 
      Fabricate :clique
    end
    let :user do 
      Fabricate :user, cliques: [clique]
    end
    
    let! :link do
      Fabricate :link, user: user, url: url, clique: clique
    end

    it "doesn't allow duplicate link for the same clique" do
      @link_2 = Fabricate.build :link, user: user, url: url, clique: clique
      expect(@link_2).not_to be_valid
      expect(@link_2.errors.messages[:url]).not_to be_blank
    end

  end
end
