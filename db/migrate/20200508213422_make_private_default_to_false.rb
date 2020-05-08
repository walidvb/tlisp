class MakePrivateDefaultToFalse < ActiveRecord::Migration[5.2]
  def change
    change_column :curated_lists, :private, :boolean, default: true, index: true
    CuratedList.where(private: nil).update_columns(private: false)
  end
end
