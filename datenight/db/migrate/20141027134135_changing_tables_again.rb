class ChangingTablesAgain < ActiveRecord::Migration
   def change
      remove_column :events, :address, :string
     add_column :events, :rating, :integer
 
  end
end
