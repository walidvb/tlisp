class CreateCuratedLists < ActiveRecord::Migration
  def change
    create_table :curated_lists do |t|
      t.string :source
      t.string :host
      t.string :title
      t.string :description
      t.string :image_url
      t.integer :links_count

      t.timestamps null: false
    end
  end
end
