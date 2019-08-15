class AddIndexOnCuratedListLink < ActiveRecord::Migration[5.2]
  def change
    CuratedListLink.delete_all
    add_index :curated_list_links, [:curated_list_id, :link_id], unique: true
  end
end
