class CreateCuratedLists < ActiveRecord::Migration[4.2]
  def change
    create_table :curated_lists do |t|
      t.string :source
      t.string :url
      t.string :host
      t.string :title
      t.string :description
      t.string :image_url
      t.string :site_name

      t.integer :links_count, default: 0

      t.timestamps null: false
    end
  end
end
