class User < ActiveRecord::Base
  scope :confirmed, ->{ where.not(confirmed_at: nil) }
  
  has_many :links
  has_many :clique_memberships, inverse_of: :user
  has_many :cliques, through: :clique_memberships, inverse_of: :users
  has_many :playlists, inverse_of: :user

  before_save :ensure_authentication_token!

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable, :confirmable

  # Validations
  # :email
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :name, :initials, if: -> { self.confirmed? }

  private
  def ensure_authentication_token!
    self.auth_token ||= Devise.friendly_token[0,40]
  end
end
