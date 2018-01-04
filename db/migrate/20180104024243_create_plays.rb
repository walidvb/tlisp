class CreatePlays < ActiveRecord::Migration
  def change
    create_table :plays do |t|
      t.references :user, null: false
      t.references :link, null: false
      t.timestamps null: false
    end
    add_column :users, :plays_count, :integer, default: 0
    add_column :links, :plays_count, :integer, default: 0
  end
end
