class AddCliqueToLinks < ActiveRecord::Migration
  def change
    add_reference :links, :clique, index: true
  end
end
