class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.date :date
      t.integer :zip_code
      t.integer :user_id
      t.text :notes
    end
  end
end
