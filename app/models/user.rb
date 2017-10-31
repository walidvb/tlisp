class User < ActiveRecord::Base
  has_many :links
  before_save :ensure_authentication_token!

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable, :confirmable

  # Validations
  # :email
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :name

  private
  def ensure_authentication_token!
    self.auth_token ||= Devise.friendly_token[0,40]
  end
end
