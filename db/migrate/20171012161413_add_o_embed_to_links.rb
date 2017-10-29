class AddOEmbedToLinks < ActiveRecord::Migration
  def change
    add_column :links, :oembed, :text
  end
end
