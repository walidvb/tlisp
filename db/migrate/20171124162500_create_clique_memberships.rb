class CreateCliqueMemberships < ActiveRecord::Migration
  def change
    create_table :clique_memberships do |t|
      t.references :user
      t.references :clique
      t.timestamps null: false
    end
    add_index :clique_memberships, [:user_id, :clique_id], unique: true
  end
end
