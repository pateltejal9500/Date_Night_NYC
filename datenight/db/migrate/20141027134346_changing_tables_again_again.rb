class ChangingTablesAgainAgain < ActiveRecord::Migration
  def change
     remove_column :events, :description, :string
  end
end
