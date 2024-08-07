require 'bcrypt'
class RegisterController < ApplicationController
  def register_form
    owner_first_name = params[:owner_first_name]
    owner_last_name = params[:owner_last_name]
    company_name = params[:company_name]
    email = params[:email]
    username = params[:username]
    website = params[:website]
    password = params[:password]
    hash_password = BCrypt::Password.create(password)
    puts hash_password

    company = Company.new(
      owner_first_name: owner_first_name,
      owner_last_name: owner_last_name,
      company_name: company_name,
      email: email,
      username: username,
      website: website,
      password: hash_password
    )
    
    if company.save
      render json: { message: 'Company has been created' }, status: :created
    else
      render json: { message: company.errors.full_messages[0] }, status: :unprocessable_entity
    end
  end
end
