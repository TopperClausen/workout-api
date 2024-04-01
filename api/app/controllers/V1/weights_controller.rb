# frozen_string_literal: true

module V1
  class WeightsController < BaseController # :nodoc:
    before_action :authorize

    def index
      weights = @user.weights
      success_response(data: weights)
    end

    def show
      weight = @user.weights.find(params[:id])
      success_response(data: weight)
    end

    def create
      weight = @user.weights.new(weight_params, user: @user)
      if weight.save
        success_response(data: weight)
      else
        bad_request_response(errors: weight.errors.full_messages)
      end
    end

    def update
      weight = @user.weights.find(params[:id])
      if weight.update(weight_params)
        success_response(data: weight)
      else
        bad_request_response(errors: weight.errors.full_messages)
      end
    end

    def destroy
      weight = @user.weights.find(params[:id])
      weight.destroy
      success_response
    end

    def weight_params
      params.require(:weight).permit(:weight, :weighed_at, :unit)
    end
  end
end
