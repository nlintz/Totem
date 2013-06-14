class AddWorkflowIdToStep < ActiveRecord::Migration
  def change
    add_column :steps, :workflow_id, :integer
  end
end
