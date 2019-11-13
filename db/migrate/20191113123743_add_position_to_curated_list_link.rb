class AddPositionToCuratedListLink < ActiveRecord::Migration[5.2]
  def change
    add_column :curated_list_links, :position, :integer, default: 0
  end
end
