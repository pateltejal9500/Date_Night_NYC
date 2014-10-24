class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.integer :user_id
      t.integer :plan_id
      t.string :name
      t.string :url
    end
  end
end
