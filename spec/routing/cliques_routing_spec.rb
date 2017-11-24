require "spec_helper"

RSpec.describe CliquesController, type: :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/cliques").to route_to("cliques#index")
    end

    it "routes to #new" do
      expect(:get => "/cliques/new").to route_to("cliques#new")
    end

    it "routes to #show" do
      expect(:get => "/cliques/1").to route_to("cliques#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/cliques/1/edit").to route_to("cliques#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/cliques").to route_to("cliques#create")
    end

    it "routes to #update via PUT" do
      expect(:put => "/cliques/1").to route_to("cliques#update", :id => "1")
    end

    it "routes to #update via PATCH" do
      expect(:patch => "/cliques/1").to route_to("cliques#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/cliques/1").to route_to("cliques#destroy", :id => "1")
    end

  end
end
