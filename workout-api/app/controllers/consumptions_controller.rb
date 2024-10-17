class ConsumptionsController < ApplicationController
  before_action :authorize

  def create
    consumption = Consumption.new(consumption_params)
    consumption.user = current_user
    
    consumption.save!
    render json: consumption, status: :created
  end

  def index
    date = params[:date].present? ? params[:date].to_date : Date.today
    consumptions = current_user.consumptions.where(created_at: date.beginning_of_day..date.end_of_day)
    render json: consumptions
  end

  def destroy
    consumption = current_user.consumptions.find(params[:id])
    consumption.destroy
    head :no_content
  end

  def update
    consumption = current_user.consumptions.find(params[:id])
    consumption.update!(consumption_params)
    render json: consumption
  end

  private

  def consumption_params
    params.require(:consumption).permit(:barcode, :product_name, :grams, :calories, :fat, :carbs, :protein, :sugar, :salt, :saturated_fat, :sodium)
  end
end