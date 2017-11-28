require 'spec_helper'

describe BandcampOembed do
    let :oembed do 
        BandcampOembed.new("http://shop.mentalgroove.ch/album/sao-paulo").get_oembed
    end

    it "gets the basic attributes" do 
        expect(oembed["title"]).to eq("Sao Paulo")
        expect(oembed["author_name"]).to eq("Mama Rosin")
    end

    it "gets the description" do
        expect(oembed["description"]).to match("fantastic tropical session")
    end

    it "gets the iframe" do 
        expect(oembed["html"]).to match(/bandcamp.com\/EmbeddedPlayer\/v=2\/album=1387352813/)
    end
end

