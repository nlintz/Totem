class UsersController < ApplicationController
	
	def create
  		User.create(user_params)
	end

	def getCurrentUser
		@user = current_user
		render json: @user
	end

	def getCurrentUserTotemFlows

		@totem_flows = TotemFlow.where(user_id: params[:id])
		render json: @totem_flows
	end
end
