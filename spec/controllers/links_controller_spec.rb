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
          post :create, { link: {url: url, clique_ids: [clique.id]}}
        }.to change(Link, :count).by(1)
      end

      context "when already posted in the clique by someone else" do 
        before do 
          Fabricate(:link, url: url, users: [user2], cliques: [clique])
        end

        it "doesn't duplicate the link" do 
          expect { 
            post :create, { link: {url: url, clique_ids: [clique.id]}}
          }.to change(Link, :count).by(0)
        end

        it "adds an assignment to a clique" do
          expect { 
            post :create, { link: {url: url, clique_ids: [clique.id]}}
          }.to change(LinkCliqueAssignment, :count).by(1)
        end

        it "creates an unexisting playlist and adds it to it" do
          expect { 
            post :create, { link: {url: url, playlist_ids: ["test"]}}
            expect(user.playlists.count).to eq(1)
          }.to change(Playlist, :count).by(1)
        end

      end
    end

    context "without valid oembed source" do 
      let :url do
        "http://example.com"
      end

      it 'creates the link' do
        expect { 
          post :create, { link: {url: url, clique_ids: [clique.id]}}
        }.to change(Link, :count).by(1)
      end
    end

  end
end
