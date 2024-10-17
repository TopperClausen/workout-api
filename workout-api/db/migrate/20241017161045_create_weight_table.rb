class CreateWeightTable < ActiveRecord::Migration[7.2]
  def change
    create_table :weights do |t|
      t.integer :user_id, null: false
      t.decimal :weight, null: false
      t.decimal :muscle_mass_percentage, null: false
      t.decimal :fat_mass_percentage, null: false
      t.decimal :water_percentage, null: false
      t.timestamps
    end
  end
end
