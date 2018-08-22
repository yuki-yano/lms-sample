class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  before_action :cors_set_access_control_headers

  def index
    render json: {}, status: :ok
  end

  def cors_preflight_check
    if request.method == 'OPTIONS'
      cors_set_access_control_headers
      render json: {}
    end
  end

  protected

  def cors_set_access_control_headers
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, PATCH, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Accept, Authorization, Email, Access-Token, Client, Uid'
    response.headers['Access-Control-Expose-Headers'] = 'access-token, client, uid'
    response.headers['Access-Control-Max-Age'] = '1728000'
  end
end
