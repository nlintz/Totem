class TotemBlocksController < ApplicationController
  def index
    @totem_flow = TotemFlow.find(params[:totem_flow_id])
  	@totem_blocks = @totem_flow.totem_blocks
  	render json: @totem_blocks
  end

  def update
    @totem_flow = TotemFlow.find(params[:totem_flow_id])
    @totem_block = @totem_flow.totem_blocks.find(params[:id])
    @totem_block.update_attributes(params[:totemBlock])
    render json: @totem_block
  end

  def createNew
  	@totem_flow = TotemFlow.find(params[:totem_flow_id])
  	@totem_block = @totem_flow.totem_blocks.create()
    @totem_block.position = @totem_flow.totem_blocks.count-1
    @totem_block.save()
  	render json: @totem_block
  end
  
  def show
  	@totem_flow = TotemFlow.find(params[:totem_flow_id])
  	@totem_block = @totem_flow.totem_blocks.find(params[:id])
  	render json: @totem_block
  end

  def destroy
    @totem_block = TotemBlock.find(params[:id])
    @totem_block.destroy()
    render json: "delete success"
  end
end
