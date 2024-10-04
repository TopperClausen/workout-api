class UsersController < ApplicationController
  before_action :authorize, only: [:index]

  def create
    user = User.create!(permitted_params)
    render json: { message: 'success', data: { jwt: JwtService.encode(user.to_json) } }, status: :ok
  end

  def index
    render json: { message: 'success', data: User.all }, status: :ok
  end

  private

  def permitted_params
    params.permit(
      :email,
      :password,
      :first_name,
      :last_name,
      :birth_date
    )
  end
end