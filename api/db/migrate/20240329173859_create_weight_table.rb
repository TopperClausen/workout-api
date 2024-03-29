class CreateWeightTable < ActiveRecord::Migration[7.1]
  def change
    create_table :weights do |t|
      t.decimal :weight, null: false
      t.datetime :weighed_at, null: false
      t.string :unit, null: false
      t.timestamps

      t.references :user, foreign_key: true
    end
  end
end
