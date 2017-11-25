class AddSlugToCliques < ActiveRecord::Migration
  def change
    add_index :cliques, :slug, unique: true
  end
end
