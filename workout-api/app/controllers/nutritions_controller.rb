class NutritionsController < ApplicationController
  before_action :authorize

  def show
    barcode = params[:id]
    raw = params[:raw]
    puts raw

    response = HTTParty.get("#{url}product/#{barcode}", headers: nutrion_api_headers)

    render json: { message: 'success', data: raw == 'true' ? JSON.parse(response.body) : nutrition_response_to_response(JSON.parse(response.body)) }
  end

  private

  def nutrition_response_to_response(response)
    {
      name: response["product"]["product_name"],
      kcal_per: kcal_from_nutriments(response["product"]["nutriments"])
    }
  end

  def kcal_from_nutriments(nutriments)
    [
      { name: "Serving", kcal: nutriments["energy_serving"], protein: nutriments["proteins_serving"], carbs: nutriments["carbohydrates_serving"], fat: nutriments["fat_serving"], sugar: nutriments["sugars_serving"], salt: nutriments["salt_serving"], saturated_fat: nutriments["saturated-fat_serving"], sodium: nutriments["sodium_serving"]  },
      { name: "100 grams", kcal: nutriments["energy-kcal_100g"], protein: nutriments["proteins_100g"], carbs: nutriments["carbohydrates_100g"], fat: nutriments["fat_100g"], sugar: nutriments["sugars_100g"], salt: nutriments["salt_100g"], saturated_fat: nutriments["saturated-fat_100g"], sodium: nutriments["sodium_100g"]  },
    ]
  end

  def url
    "https://dk.openfoodfacts.org/api/v0/"
  end

  def nutrion_api_headers
    {
      'User-Agent': 'TopsWorkoutApp/1.0'
    }
  end
end