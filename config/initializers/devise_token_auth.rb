# frozen_string_literal: true

DeviseTokenAuth.setup do |config|
  config.change_headers_on_each_request = false
  config.token_lifespan = 1.month
  config.max_number_of_devices = 10
  config.batch_request_buffer_throttle = 5.seconds
  config.omniauth_prefix = '/omniauth'
  config.default_callbacks = true

  config.headers_names = {
    'access-token': 'access-token',
    client: 'client',
    expiry: 'expiry',
    uid: 'uid',
    'token-type': 'token-type'
  }

  # By default, only Bearer Token authentication is implemented out of the box.
  # If, however, you wish to integrate with legacy Devise authentication, you can
  # do so by enabling this flag. NOTE: This feature is highly experimental!
  config.enable_standard_devise_support = false
end
