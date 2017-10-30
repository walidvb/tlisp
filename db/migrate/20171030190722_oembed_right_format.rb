class OembedRightFormat < ActiveRecord::Migration
  def change
    change_column :links, :oembed, :text
  end
end
