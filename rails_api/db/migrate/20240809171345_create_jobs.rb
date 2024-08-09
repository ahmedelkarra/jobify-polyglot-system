class CreateJobs < ActiveRecord::Migration[7.1]
  def change
    create_table :jobs do |t|
      t.text :title
      t.text :body
      t.references :author, null: false, foreign_key: true

      t.timestamps
    end
  end
end
