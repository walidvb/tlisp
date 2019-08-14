class CuratedListLink < ActiveRecord::Base
  belongs_to :curated_list
  belongs_to :link
end
