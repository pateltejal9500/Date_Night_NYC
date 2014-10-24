class AddingTimestampsActivities < ActiveRecord::Migration
  def change
    add_column :activities, :created_at, :datetime
    add_column :activities, :updated_at, :datetime
  end
end
