class TotemBlocksController < ApplicationController
  def index
  	@totem_blocks = TotemBlock.all
  	render json: @totem_blocks
  end
end
