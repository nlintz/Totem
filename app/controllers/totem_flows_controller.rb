class TotemFlowsController < ApplicationController
	def index
		@totem_flows = TotemFlow.all
		render json: @totem_flows
	end

	def show
		@totem_flow = TotemFlow.find(params[:id])
		render json: @totem_flow
	end

	def uploadImage
	end
end
