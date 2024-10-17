# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2024_10_17_161045) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "consumptions", force: :cascade do |t|
    t.string "barcode"
    t.string "product_name"
    t.integer "grams"
    t.integer "calories"
    t.integer "fat"
    t.integer "carbs"
    t.integer "protein"
    t.integer "sugar"
    t.integer "salt"
    t.integer "saturated_fat"
    t.integer "sodium"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_consumptions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.date "birth_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  create_table "weights", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "weight", null: false
    t.decimal "muscle_mass_percentage", null: false
    t.decimal "fat_mass_percentage", null: false
    t.decimal "water_percentage", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end
end
