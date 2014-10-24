class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name
      t.string :description
      t.string :address
      t.string :url
      t.integer :neighborhood_id
    end
  end
end
