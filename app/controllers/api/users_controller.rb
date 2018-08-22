module Api
  class UsersController < ApplicationController
    def index
      render json: {
        users: User.all.to_json(methods: [:invitation_sent_at, :invitation_accepted_at])
      }, status: :ok
    end
  end
end
