class AddBlockImageUrlToTotemBlock < ActiveRecord::Migration
  def change
    add_column :totem_blocks, :block_image_url, :string
  end
end
