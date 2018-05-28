class AddLinksCountToUsers < ActiveRecord::Migration
  def change
    add_column :users, :link_clique_assignments_count, :integer, default: 0
    User.reset_column_information
    User.all.map do |u|
      User.reset_counters(u.id, :link_clique_assignments)
    end
  end
end
