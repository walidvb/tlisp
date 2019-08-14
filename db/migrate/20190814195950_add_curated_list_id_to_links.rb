class AddCuratedListIdToLinks < ActiveRecord::Migration[5.2]
  def change
    add_reference :links, :curated_list
  end
end
