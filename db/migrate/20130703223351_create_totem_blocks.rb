class CreateTotemBlocks < ActiveRecord::Migration
  def change
    create_table :totem_blocks do |t|
      t.string :title
      t.text :content
      t.integer :position

      t.timestamps
    end
  end
end
