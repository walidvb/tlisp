class AddPlayedAndHeardToLinkAssignments < ActiveRecord::Migration
  def change
    add_column :link_clique_assignments, :played_by, :string, index: true
    add_column :link_clique_assignments, :heard_at, :string, index: true
  end
end
