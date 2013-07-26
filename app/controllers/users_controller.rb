class UsersController < ApplicationController
	
	def index
		@users = User.all
		render json: @users
	end

	def create
  		@user = User.create(user_params)
  		render json: @user
	end

	def show
		@user = User.find(params[:id])
		render json: @user
	end

	def getCurrentUser
		@user = current_user
		render json: @user
	end

	def createNewTotemFlow
		@user = current_user
		@totem_flow = @user.totem_flows.create(name: "Name This Totem")
		render json: @totem_flow
	end

	def sendTotem
		@user = User.where(email: params[:email])
		@totemFlow = TotemFlow.find(params[:id])
	end

end
