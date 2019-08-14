class CreateCuratedListLinks < ActiveRecord::Migration[4.2]
  def change
    create_table :curated_list_links do |t|
      t.references :curated_list, index: true, null: false
      t.references :link, index: true, null: false

      t.timestamps null: false
    end
  end
end
