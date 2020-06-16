class MakePrivateDefaultToFalse < ActiveRecord::Migration[5.2]
  def change
    change_column :curated_lists, :private, :boolean, default: true, index: true
  end
end
