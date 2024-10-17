class User < ApplicationRecord
  has_secure_password

  has_many :consumptions
  has_many :weights

  validates :email, uniqueness: { case_sensitive: false }
end
