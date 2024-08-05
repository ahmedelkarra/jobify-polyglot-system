require 'jwt'
require 'bcrypt'
class LoginController < ApplicationController
  HMAC_SECRET = ENV['HMAC_SECRET']
  def login
    begin
      company = Company.find_by({username: params[:username]})
      owner_first_name = company[:owner_first_name]
      owner_last_name = company[:owner_last_name]
      company_name = company[:company_name]
      email = company[:email]
      username = company[:username]
      website = company[:website]
      password = company[:password]
      password_status = BCrypt::Password.new(password) == params[:password]
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
      if password_status
        render json: {'message': token}
      else
      render json: {'message': 'Wrong username or password'} , status: 404
      end
    rescue
      render json: {'message': 'Wrong username or password'} , status: 404
    ensure
    end
  
  end
end
