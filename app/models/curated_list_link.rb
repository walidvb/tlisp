class CuratedListLink < ActiveRecord::Base
  belongs_to :curated_list
  belongs_to :link

  acts_as_list scope: :curated_list
end
