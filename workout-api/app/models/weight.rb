class Weight < ApplicationRecord
  belongs_to :user

  validates :weight, presence: true
  validates :muscle_mass_percentage, presence: true
  validates :fat_mass_percentage, presence: true
  validates :water_percentage, presence: true
end