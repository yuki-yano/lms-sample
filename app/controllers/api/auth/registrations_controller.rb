module Api
  module Auth
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
      private

      def sign_up_params
        params.permit(:email, :name, :nickname, :password)
      end

      def account_update_params
        params.permit(:email, :name, :nickname)
      end
    end
  end
end
