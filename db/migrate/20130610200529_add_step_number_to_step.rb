class AddStepNumberToStep < ActiveRecord::Migration
  def change
    add_column :steps, :stepNumber, :integer
  end
end
