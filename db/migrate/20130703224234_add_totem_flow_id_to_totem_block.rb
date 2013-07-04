class AddTotemFlowIdToTotemBlock < ActiveRecord::Migration
  def change
    add_column :totem_blocks, :totem_flow_id, :integer
  end
end
