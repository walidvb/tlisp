class AddAuthenticationTokenToUsers < ActiveRecord::Migration
  def change
    add_column :users, :auth_token, :string, default: "asd"
    change_column :users, :auth_token, :string, null: false
    User.reset_column_information
    User.all.map do |user|
      user.auth_token = nil
      user.save!
    end
  end
end
