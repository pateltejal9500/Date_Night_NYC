class CreateHistories < ActiveRecord::Migration
  def change
    create_table :histories do |t|
      t.integer :user_id
      t.integer :activity_id
      t.string :comment
      t.integer :rating
      t.timestamps
    end
  end
end
