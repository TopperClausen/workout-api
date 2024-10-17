class ApplicationController < ActionController::API

  rescue_from ActiveRecord::RecordNotFound, with: -> { not_found_response }
  rescue_from ActiveRecord::RecordInvalid, with: ->(e) { bad_request_response(errors: e.record.errors) }
  rescue_from ActionController::ParameterMissing, with: ->(e) { bad_request_response(message: e.message) }
  rescue_from ActionController::UnpermittedParameters, with: ->(e) { bad_request_response(message: e.message) }
  rescue_from PG::UniqueViolation, with: ->(error) { render json: { message: "unique violation", raised: error }, status: :conflict}
  rescue_from ActiveRecord::RecordNotFound, with: ->(error) { render json: { message: "record not found", raised: error }, status: :not_found }
  rescue_from ActiveRecord::RecordInvalid, with: ->(error) { render json: { message: "record invalid", raised: error }, status: :unprocessable_entity }
  rescue_from JWT::DecodeError, with: -> { unauthorized_response }
  rescue_from JWT::VerificationError, with: -> { unauthorized_response }
  rescue_from JWT::ExpiredSignature, with: -> { unauthorized_response }

  private

  def authorize
    jwt = request.headers[:Authorization];
    if jwt.blank?
        unauthorized_response
        return false
    end

    puts(jwt)
    decoded = JwtService.decode(jwt);
    puts(decoded)
    @user = User.find(decoded["id"]);
    if @user.blank?
        unauthorized_response
        return false
    end

    if params[:user_id].present? && @user.id != params[:user_id].to_i
        unauthorized_response
        return false
    end
  end

  def current_user
    @user
  end

  def unauthorized_response
      render json: { message: 'Unauthorized' }, status: :unauthorized
  end

  def success_response(message: 'Success', data: nil, status: 200)
      render json: { message: message, data: data }, status: status
  end

  def not_found_response
      render json: { message: 'Not found' }, status: :not_found
  end

  def server_error_response
      render json: { message: 'Internal server error' }, status: 500
  end

  def bad_request_response(message: 'Bad request', errors: nil)
      render json: { message: message, errors: errors }, status: :bad_request
  end
end
