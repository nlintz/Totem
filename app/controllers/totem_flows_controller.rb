class TotemFlowsController < ApplicationController
	def index
		@totem_flows = TotemFlow.all
		render json: @totem_flows
	end

	def create
		@user = User.find(params[:user_id])
		@totemFlow = @user.totem_flows.create(name: "Name This Totem")
		@totemFlow.totem_blocks.create()
		@totemFlow.save()
		render json: @totem_flow
	end

	def show
		@totem_flow = TotemFlow.find(params[:id])
		render json: @totem_flow
	end

	def destroy
		@totem_flow = TotemFlow.find(params[:id])
		@totem_flow.destroy()
    	render json: "delete success"
	end

	def update
		@totem_flow = TotemFlow.find(params[:id])
    	@totem_flow.update_attributes(params[:totem_flow])
    	@totem_flow.save
    	render json: @totem_flow
	end

# TODO, move method into totem blocks controller/model
	def uploadImage
		@totem_block = TotemFlow.find(params[:totem_flow_id]).totem_blocks.find(params[:totem_block_id])
		@totem_block.block_image_url = params[:block_image_url]
		@totem_block.save()
		render json: params[:image_url]
	end
end
