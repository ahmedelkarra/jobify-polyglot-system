class Company < ApplicationRecord
  validates :owner_first_name, presence: true
  validates :owner_last_name, presence: true
  validates :email, presence: true , uniqueness: true
  validates :username, presence: true , uniqueness: true
  validates :company_name, presence: true , uniqueness: true
  validates :password, presence: true , uniqueness: true , length: {minimum: 7}
end
