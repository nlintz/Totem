class TotemBlocksController < ApplicationController
  def index
  	@totem_blocks = TotemBlock.all
  	render json: @totem_blocks
  end

  def show
  	@totem_flow = TotemFlow.find(params[:totem_flow_id])
  	@totem_block = @totem_flow.totem_blocks.find(params[:id])
  	render json: @totem_block
  end
end
