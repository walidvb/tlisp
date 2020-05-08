class CuratedList < ActiveRecord::Base
  has_many :curated_list_links, dependent: :destroy
  has_many :links, through: :curated_list_links

  scope :public, ->{ where.not(private: true)}
end
