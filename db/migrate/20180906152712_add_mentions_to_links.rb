class AddMentionsToLinks < ActiveRecord::Migration
  def change
    add_column :links, :mentions, :string, array: true, default: []
  end
end
