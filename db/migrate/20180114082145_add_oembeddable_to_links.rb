class AddOembeddableToLinks < ActiveRecord::Migration
  def change
    add_column :links, :oembeddable, :boolean

    Link.reset_column_information
    Link.all.map{|l| l.oembeddable = (l.oembed == {} ? false : true); begin; l.save!; rescue; p "#{l.id} failed to save :(" end; }
  end
end
