class History < ActiveRecord::Base
  has_many :activities
  belongs_to :user
  
end