module Api
  module Auth
    class InvitationsController < Devise::InvitationsController
      before_action :resource_from_invitation_token, only: :update

      def create
        self.resource = invite_resource
        resource_invited = resource.errors.empty?

        if resource_invited
          render json: { success: ['User created.'] }, status: :created
        else
          render json: resource.errors.to_json, status: :not_acceptable
        end
      end

      def update
        self.resource = accept_resource
        invitation_accepted = resource.errors.empty?

        yield resource if block_given?

        if invitation_accepted
          sign_in(resource_name, resource) if Devise.allow_insecure_sign_in_after_accept
          render json: { success: resource }.to_json, status: :accepted
        else
          render json: { error: ['invitation not acdepted'] }, status: :not_acceptable
        end
      end

      private

      def invite_params
        params.permit(:email)
      end

      def update_resource_params
        params.permit(:invitation_token, :password, :password_confirmation, :name, :nickname)
      end

      def invite_resource(&block)
        resource_class.invite!(invite_params, current_inviter, &block)
      end

      def accept_resource
        resource_class.accept_invitation!(update_resource_params)
      end

      def resource_class(model = nil)
        mapping = if model
                    Devise.mappings[model]
                  else
                    Devise.mappings[resource_name] || Devise.mappings.values.first
                  end
        mapping.to
      end

      def resource_from_invitation_token
        return if User.find_by_invitation_token(params.dig(:invitation_token), true) # rubocop:disable Rails/DynamicFindBy
        render json: { errors: ['Invalid token.'] }, status: :not_acceptable
      end
    end
  end
end
