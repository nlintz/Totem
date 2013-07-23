class AddTotemTypeToTotemBlock < ActiveRecord::Migration
  def change
    add_column :totem_blocks, :totem_type, :string
  end
end
