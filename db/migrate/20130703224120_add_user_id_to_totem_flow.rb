class AddUserIdToTotemFlow < ActiveRecord::Migration
  def change
    add_column :totem_flows, :user_id, :integer
  end
end
