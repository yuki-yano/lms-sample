# frozen_string_literal: true

# == Route Map
#
#                       Prefix Verb    URI Pattern                           Controller#Action
#                              OPTIONS /*all(.:format)                       application#cors_preflight_check
#                         root GET     /                                     application#index
#         new_api_user_session GET     /api/auth/sign_in(.:format)           devise_token_auth/sessions#new
#             api_user_session POST    /api/auth/sign_in(.:format)           devise_token_auth/sessions#create
#     destroy_api_user_session DELETE  /api/auth/sign_out(.:format)          devise_token_auth/sessions#destroy
#        new_api_user_password GET     /api/auth/password/new(.:format)      devise_token_auth/passwords#new
#       edit_api_user_password GET     /api/auth/password/edit(.:format)     devise_token_auth/passwords#edit
#            api_user_password PATCH   /api/auth/password(.:format)          devise_token_auth/passwords#update
#                              PUT     /api/auth/password(.:format)          devise_token_auth/passwords#update
#                              POST    /api/auth/password(.:format)          devise_token_auth/passwords#create
# cancel_api_user_registration GET     /api/auth/cancel(.:format)            api/auth/registrations#cancel
#    new_api_user_registration GET     /api/auth/sign_up(.:format)           api/auth/registrations#new
#   edit_api_user_registration GET     /api/auth/edit(.:format)              api/auth/registrations#edit
#        api_user_registration PATCH   /api/auth(.:format)                   api/auth/registrations#update
#                              PUT     /api/auth(.:format)                   api/auth/registrations#update
#                              DELETE  /api/auth(.:format)                   api/auth/registrations#destroy
#                              POST    /api/auth(.:format)                   api/auth/registrations#create
#    new_api_user_confirmation GET     /api/auth/confirmation/new(.:format)  devise_token_auth/confirmations#new
#        api_user_confirmation GET     /api/auth/confirmation(.:format)      devise_token_auth/confirmations#show
#                              POST    /api/auth/confirmation(.:format)      devise_token_auth/confirmations#create
#      api_auth_validate_token GET     /api/auth/validate_token(.:format)    devise_token_auth/token_validations#validate_token
#   accept_api_user_invitation GET     /api/auth/invitation/accept(.:format) api/auth/invitations#edit
#   remove_api_user_invitation GET     /api/auth/invitation/remove(.:format) api/auth/invitations#destroy
#      new_api_user_invitation GET     /api/auth/invitation/new(.:format)    api/auth/invitations#new
#          api_user_invitation PATCH   /api/auth/invitation(.:format)        api/auth/invitations#update
#                              PUT     /api/auth/invitation(.:format)        api/auth/invitations#update
#                              POST    /api/auth/invitation(.:format)        api/auth/invitations#create
#                    api_users GET     /api/users(.:format)                  api/users#index

Rails.application.routes.draw do
  match '*all', controller: 'application', action: 'cors_preflight_check', via: [:options]

  root to: 'application#index'

  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', skip: [:invitations], controllers: {
      registrations: 'api/auth/registrations',
    }
    devise_for :user, path: 'auth', only: [:invitations], controllers: {
      invitations: 'api/auth/invitations'
    }

    devise_scope :user do
      get '/users', to: 'users#index'
    end
  end
end
