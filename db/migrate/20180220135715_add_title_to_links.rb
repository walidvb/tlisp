class AddTitleToLinks < ActiveRecord::Migration
  def change
    add_column :links, :title, :string
    Link.reset_column_information
    Link.all.each do |ll|
      ll.update_column(title: ll.oembed['title'])
    end
  end
end
