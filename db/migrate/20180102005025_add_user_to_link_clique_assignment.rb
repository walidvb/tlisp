class AddUserToLinkCliqueAssignment < ActiveRecord::Migration
  def change
    add_reference :link_clique_assignments, :user, null: true
    change_column :link_clique_assignments, :clique_id, :integer, null: true
  end
end
