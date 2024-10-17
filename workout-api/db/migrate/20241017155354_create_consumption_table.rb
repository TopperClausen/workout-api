class CreateConsumptionTable < ActiveRecord::Migration[7.2]
  def change
    create_table :consumptions do |t|
      t.string :barcode
      t.string :product_name
      t.integer :grams
      t.integer :calories
      t.integer :fat
      t.integer :carbs
      t.integer :protein
      t.integer :sugar
      t.integer :salt
      t.integer :saturated_fat
      t.integer :sodium

      t.integer :user_id, null: false
      t.timestamps

      t.index :user_id
    end
  end
end
