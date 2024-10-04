class SessionsController < ApplicationController
  def create
    user = User.find_by(email: params[:email]);
    return unauthorized_response if user.nil?

    return unauthorized_response unless (user.authenticate(params[:password]))

    render json: { message: 'success', data: { jwt: JwtService.encode(user.to_json) } }
  end

  private
  
  def permitted_params
    params.permit(:email, :password)
  end
end