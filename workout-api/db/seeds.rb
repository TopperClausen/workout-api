# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

user = User.create!(email: 'admin@admin.dk', password: 'ChangeMe1337', first_name: 'Admin', last_name: 'Admin', birth_date: '1999-03-01')
Consumption.create!(barcode: '?', product_name: 'Test', grams: 100, calories: 100, fat: 10, carbs: 10, protein: 10, sugar: 10, salt: 10, saturated_fat: 10, sodium: 10, user: user, created_at: Time.zone.now, updated_at: Time.zone.now)
[*1..120].each do |i|
  consumption = Consumption.create!(barcode: '?', product_name: 'Test', grams: 100, calories: 100, fat: 10, carbs: 10, protein: 10, sugar: 10, salt: 10, saturated_fat: 10, sodium: 10, user_id: user.id, created_at: i.days.from_now, updated_at: i.days.from_now)
end
