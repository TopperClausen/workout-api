class WeightsController < ApplicationController
  def create
    weight = Weight.new(weight_params)
    weight.user = current_user
    
    weight.save!
    render json: weight, status: :created
  end

  def index 
    weights = current_user.weights
    render json: weights
  end

  def show
    weight = current_user.weights.find(params[:id])
    render json: weight
  end

  def update
    weight = current_user.weights.find(params[:id])
    weight.update!(weight_params)
    render json: weight
  end

  def destroy
    weight = current_user.weights.find(params[:id])
    weight.destroy
    head :no_content
  end
end