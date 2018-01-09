class AddSlackUrlToCliques < ActiveRecord::Migration
  def change
    add_column :cliques, :slack_url, :string
  end
end
