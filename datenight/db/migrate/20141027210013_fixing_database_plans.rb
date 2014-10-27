class FixingDatabasePlans < ActiveRecord::Migration
  def change
    remove_column :plans, :notes, :text
     remove_column :plans, :comment, :string
      add_column :plans, :comment, :text
  end
end
