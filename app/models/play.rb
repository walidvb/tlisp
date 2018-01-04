class Play < ActiveRecord::Base
    belongs_to :user, inverse_of: :plays, counter_cache: true
    belongs_to :link, inverse_of: :plays, counter_cache: true
end
