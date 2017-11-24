require 'spec_helper'

describe LinksController do
  before do
    request.env['warden'].stub :authenticate! => user
    controller.stub :current_user => user
  end
  
  let :clique do 
    Fabricate(:clique)
  end

  let :user do 
    Fabricate(:user, cliques: [clique])
  end

  let :user2 do 
    Fabricate(:user, cliques: [clique])
  end

  let :cliqueB do 
    Fabricate(:clique)
  end

  let :userB do 
    Fabricate(:user, cliques: [cliqueB])
  end

  let :url do 
    "https://www.youtube.com/watch?v=8QZ8-OCrB5s"
  end

  describe "#create" do 
    context "with valid oembed source" do 
      it "returns the link" do 
        expect { 
          post :create, { link: {url: url, clique_id: clique.id}}
        }.to change(Link, :count).by(1)
      end

      context "when already posted in the clique" do 
        before do 
          Fabricate(:link, url: url, user: user, clique: clique)
          request.env['warden'].stub :authenticate! => user2
          controller.stub :current_user => user2
          expect(clique.links.where(url: url)).not_to be_empty
        end

        it "doesn't create it" do 
          expect { 
            post :create, { link: {url: url, clique_id: clique.id}}
          }.to change(Link, :count).by(0)
        end
      end
    end
  end
end
