class AddTwitterHandleToCuratedList < ActiveRecord::Migration[5.2]
  def change
    add_column :curated_lists, :twitter_handle, :string
  end
end
