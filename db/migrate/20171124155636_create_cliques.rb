class CreateCliques < ActiveRecord::Migration
  def change
    create_table :cliques do |t|
      t.string :name
      t.string :slug
      t.string :color
      t.timestamps null: false
    end
  end
end
