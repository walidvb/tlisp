class AddTitleToLinks < ActiveRecord::Migration
  def change
      # this breaks after restoring from the heroku db..
      add_column :links, :title, :string unless Link.column_names.include?('title')
  end
end
