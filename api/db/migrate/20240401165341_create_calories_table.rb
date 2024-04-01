class CreateCaloriesTable < ActiveRecord::Migration[7.1]
  def change
    create_table :calories do |t|
      t.references :user, null: false, foreign_key: true
      t.integer :calories
      t.datetime :consumed_at

      t.timestamps
    end
  end
end
