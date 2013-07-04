class CreateTotemFlows < ActiveRecord::Migration
  def change
    create_table :totem_flows do |t|
      t.string :name
      t.text :description

      t.timestamps
    end
  end
end
