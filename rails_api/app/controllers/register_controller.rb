require 'bcrypt'
require 'jwt'
class RegisterController < ApplicationController
  HMAC_SECRET = ENV['HMAC_SECRET']
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
      payload = {
        id: company.id,
        owner_first_name: company.owner_first_name,
        owner_last_name: company.owner_last_name,
        company_name: company.company_name,
        email: company.email,
        username: company.username,
        website: company.website,
        exp: (Time.now + 1.week).to_i
      }
      token = JWT.encode(payload, HMAC_SECRET, 'HS256')
      render json: { message: 'Company has been created' , token: token}, status: :created
    else
      render json: { message: company.errors.full_messages[0] }, status: :unprocessable_entity
    end
  end
end
