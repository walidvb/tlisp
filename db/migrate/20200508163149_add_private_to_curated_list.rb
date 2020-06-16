class AddPrivateToCuratedList < ActiveRecord::Migration[5.2]
  def change
    add_column :curated_lists, :private, :boolean
  end
end
