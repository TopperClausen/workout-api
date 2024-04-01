# frozen_string_literal: true

class Weight < ApplicationRecord # :nodoc:
  belongs_to :user

  validates :weight, presence: true
  validates :weighed_at, presence: true
  validates :unit, inclusion: { in: %w[Kg Lbs] }
  validates :user, presence: true
end
