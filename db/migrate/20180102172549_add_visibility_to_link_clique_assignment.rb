class AddVisibilityToLinkCliqueAssignment < ActiveRecord::Migration
  def change
    add_column :link_clique_assignments, :visible, :boolean, default: false
    LinkCliqueAssignment.reset_column_information
    LinkCliqueAssignment.includes(:link).all.each do |lc|
      lc.visible = lc.link.published
      lc.save!
    end
  end
end
