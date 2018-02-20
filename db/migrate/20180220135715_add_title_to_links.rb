class AddTitleToLinks < ActiveRecord::Migration
  def change
    add_column :links, :title, :string
    Link.reset_column_information
    Link.all.each do |ll|
      ll.title = ll.oembed['title']
      ll.save!
    end
  end
end
