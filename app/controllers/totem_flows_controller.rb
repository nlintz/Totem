class TotemFlowsController < ApplicationController
	def index
		@totem_flows = TotemFlow.all
		render json: @totem_flows
	end
end
