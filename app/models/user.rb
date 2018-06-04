class User < ActiveRecord::Base
  acts_as_target #email: :email, email_allowed: :confirmed_at
  acts_as_notifier
  
  scope :confirmed, ->{ where.not(confirmed_at: nil) }
  
  has_many :link_clique_assignments, inverse_of: :user, :dependent => :destroy
  has_many :links, through: :link_clique_assignments, inverse_of: :users
  
  has_many :clique_memberships, inverse_of: :user, :dependent => :destroy
  has_many :cliques, through: :clique_memberships, inverse_of: :users
  has_many :playlists, inverse_of: :user, :dependent => :destroy

  has_many :plays, inverse_of: :user, :dependent => :destroy

  before_save :ensure_authentication_token!

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
  :recoverable, :rememberable, :trackable, :validatable, :confirmable

  # Validations
  # :email
  validates_format_of :email, with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates_presence_of :name, :initials, if: -> { self.confirmed? }


  rails_admin do 
        [:created_at, :updated_at].each do |ff|
        configure ff do
          visible false
        end
      end

        list do
          field :id
          field :name
          field :initials
          field :email
          field :link_clique_assignments_count
          field :cliques
        end
    end

  private
  def ensure_authentication_token!
    self.auth_token ||= Devise.friendly_token[0,40]
  end
end
