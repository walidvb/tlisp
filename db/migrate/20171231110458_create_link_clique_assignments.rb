class CreateLinkCliqueAssignments < ActiveRecord::Migration
  def change
    create_table :link_clique_assignments do |t|
      t.references :clique, index: true, null: false
      t.references :link, index: true, null: false
      t.timestamps null: false
    end
    Link.all.map do |l|
      begin
        l.clique_ids = [l.clique_id]
      rescue 
        p "========"
        p "#{l.inspect}"
      end
    end
  end
end
