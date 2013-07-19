class AddBlockImageToTotemBlock < ActiveRecord::Migration
  def change
  	add_attachment :totem_blocks, :block_image
  end
end
