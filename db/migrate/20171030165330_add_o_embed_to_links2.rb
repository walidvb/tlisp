class AddOEmbedToLinks2 < ActiveRecord::Migration
  def change
    Link.delete_all
    remove_column :links, :oembed
    add_column :links, :oembed, :json, default: "{}"    
  end
end
