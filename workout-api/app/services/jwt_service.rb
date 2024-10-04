
class JwtService
  def self.encode(data)
    JWT.encode(data, 'secret')
  end

  def self.decode(token)
    JSON.parse JWT.decode(token, 'secret')[0]
  rescue JWT::DecodeError
      nil
  end
end