class AddingToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :comment, :string
    add_column :activities, :rating, :integer
  end
end
