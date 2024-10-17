class Consumption < ApplicationRecord
  belongs_to :user

  validates :barcode, presence: true
  validates :product_name, presence: true
  validates :grams, presence: true
  validates :calories, presence: true
  validates :fat, presence: true
  validates :carbs, presence: true
  validates :protein, presence: true
end