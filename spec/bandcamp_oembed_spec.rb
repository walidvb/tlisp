require 'spec_helper'

describe BandcampOembed do
    let :oembed do 
        BandcampOembed.new("http://shop.mentalgroove.ch/album/sao-paulo").get_oembed
    end

    it "gets the basic attributes" do 
        expect(oembed[:title]).to eq("Sao Paulo")
        expect(oembed[:author_name]).to eq("Mama Rosin")
    end

    it "gets the description" do
        expect(oembed[:description]).to match("fantastic tropical session")
    end

    it "gets the iframe" do 
        expect(oembed[:html]).to eq("<iframe style='border: 0; width: 100%; height: 42px;' src='http://bandcamp.com/EmbeddedPlayer/album=1387352813/size=small/bgcol=ffffff/linkcol=0687f5/transparent=true/' seamless></iframe>")
    end
end