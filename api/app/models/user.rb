# frozen_string_literal: true

class User < ApplicationRecord # :nodoc:
  has_many :weights
  has_many :calories

  has_secure_password

  validates :full_name, presence: true
  validates :email, presence: true, uniqueness: true

  def jwt
    payload = {
        id: id,
        email: email
    }
    JwtService.encode(payload, 1.week.from_now)
  end

  def self.from_jwt(jwt)
    payload = JwtService.decode(jwt)
    User.find(payload[:id])
  rescue JWT::DecodeError
    nil
  end
end
