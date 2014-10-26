class Changingbooleantoplans < ActiveRecord::Migration
  def change
     remove_column :activities, :done, :boolean
     add_column :plans, :done, :boolean
  end
end
