class CreateLinkCliqueAssignments < ActiveRecord::Migration
  def change
    create_table :link_clique_assignments do |t|
      t.references :clique, index: true, null: false
      t.references :link, index: true, null: false
      t.timestamps null: false
    end
    Link.all.map do |l|
      begin
        l.assign_to users: [User.find(l.user_id)], cliques: [Clique.find(l.clique_id)].compact
        l.save!
      rescue => e
        p "========"
        p e
        p "#{l.inspect}"
      end
    end
  end
end
