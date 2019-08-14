module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = find_verified_user
      puts "!=!=!=!=!="
    end

    private

    def find_verified_user
      User.find_by(auth_token: request.params[:auth_token])
    end
  end
end
