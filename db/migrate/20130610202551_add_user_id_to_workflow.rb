class AddUserIdToWorkflow < ActiveRecord::Migration
  def change
    add_column :workflows, :user_id, :integer
  end
end
