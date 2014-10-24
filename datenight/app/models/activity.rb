class Activity < ActiveRecord::Base
  belongs_to :user
  belongs_to :plan
  belongs_to :activity
end