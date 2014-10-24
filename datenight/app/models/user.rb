class User < ActiveRecord::Base
  self.has_secure_password()
  has_many :plans, dependent: :destroy
  has_many :activities, dependent: :destroy
  has_many :histories, dependent: :destroy
end