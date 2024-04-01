# frozen_string_literal: true

class Calory < ApplicationRecord # :nodoc:
  belongs_to :user

  validates :consumed_at, presence: true
  validates :calories, presence: true
  validates :user, presence: true
end
