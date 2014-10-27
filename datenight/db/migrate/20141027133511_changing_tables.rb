class ChangingTables < ActiveRecord::Migration
  def change
    remove_column :activities, :comment, :string
     add_column :plans, :comment, :string
     add_column :plans, :rating, :integer
     remove_column :events, :neighborhood_id, :string
     rename_column :plans, :zip_code, :neighborhood_id
     remove_column :plans, :notes, :string
      add_column :plans, :notes, :text


  end
end
