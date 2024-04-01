# frozen_string_literal: true

module V1
  class CaloriesController < BaseController # :nodoc:
    before_action :authorize

    def index
      calories = @user.calories
      success_response(data: calories)
    end

    def show
      calorie = @user.calories.find(params[:id])
      success_response(data: calorie)
    end

    def create
      calorie = @user.calories.new(calorie_params, user: @user)
      if calorie.save?
        success_response(data: calorie)
      else
        bad_request_response(errors: calorie.errors.full_messages)
      end
    end

    def update
      calorie = @user.calories.find(params[:id])
      if calorie.update(calorie_params)
        success_response(data: calorie)
      else
        bad_request_response(errors: calorie.errors.full_messages)
      end
    end

    def destroy
      calorie = @user.calories.find(params[:id])
      calorie.destroy
      success_response
    end
  end
end
