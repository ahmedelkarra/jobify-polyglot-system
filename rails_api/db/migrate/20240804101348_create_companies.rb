class CreateCompanies < ActiveRecord::Migration[7.1]
  def change
    create_table :companies do |t|
      t.text :owner_first_name
      t.text :owner_last_name
      t.text :company_name
      t.text :email
      t.text :username
      t.text :website
      t.text :password

      t.timestamps
    end
  end
end
