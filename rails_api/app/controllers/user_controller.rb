require 'jwt'
require 'bcrypt'
class UserController < ApplicationController
  HMAC_SECRET = ENV['HMAC_SECRET']
  def company_info
    token = request.headers['Authorization']
    if not token.nil?
      begin
        decoded_token = JWT.decode(token,HMAC_SECRET,true,{ algorithm: 'HS256' }).first
        company = Company.find(decoded_token['id'])
        payload = {
          id: company.id,
          owner_first_name: company.owner_first_name,
          owner_last_name: company.owner_last_name,
          company_name: company.company_name,
          email: company.email,
          username: company.username,
          website: company.website,
        }
        if payload[:website] == nil
          payload[:website] = ''
        end
        if company
          render json: {'message': payload} , status: 200
        else
          render json: {'message': 'Invalid token'} , status: 404
        end
      rescue
        render json: {'message': 'Invalid token'} , status: 404
      end
    else
      render json: {'message': 'Token is missing'} , status: 400
    end 
  end

  def company_update
    owner_first_name=params[:owner_first_name]
    owner_last_name=params[:owner_last_name]
    email=params[:email]
    username=params[:username]
    company_name=params[:company_name]
    website=params[:website]
    password=params[:password]
    new_password=params[:new_password]
    confirm_new_password=params[:confirm_new_password]
    if owner_first_name and owner_last_name and email and username and company_name and password and not new_password or not confirm_new_password
      begin
        token = request.headers['Authorization']
        decoded_token = JWT.decode(token,HMAC_SECRET,true,{ algorithm: 'HS256' }).first
        company = Company.find(decoded_token['id'])
        password = company[:password]
        password_status = BCrypt::Password.new(password) == params[:password]
        if company and password_status
          company.update(owner_first_name: owner_first_name , owner_last_name: owner_last_name , email: email , username: username , company_name: company_name ,)
          render json: {'message': 'Company has been updated'} , status: 200
        elsif password_status == false
          render json: {'message': 'Worng username or password'} , status: 404
        else
          render json: {'message': 'Invalid token'} , status: 404
        end
      rescue StandardError => e
        puts e
        render json: {'message': 'Invalid token'} , status: 404
      end
      elsif owner_first_name and owner_last_name and email and username and company_name and password and new_password and new_password == confirm_new_password
        begin
          token = request.headers['Authorization']
          decoded_token = JWT.decode(token,HMAC_SECRET,true,{ algorithm: 'HS256' }).first
          company = Company.find(decoded_token['id'])
          password = company[:password]
          password_status = BCrypt::Password.new(password) == params[:password]
          hash_password = BCrypt::Password.create(new_password)
          if company and password_status
            company.update(owner_first_name: owner_first_name , owner_last_name: owner_last_name , email: email , username: username , company_name: company_name , password: hash_password)
            render json: {'message': 'Company has been updated'} , status: 200
          elsif password_status == false
            render json: {'message': 'Worng username or password'} , status: 404
          else
            render json: {'message': 'Invalid token'} , status: 404
          end
        rescue StandardError => e
          puts e
          render json: {'message': 'Invalid token'} , status: 404
        end
      elsif new_password != confirm_new_password
        render json: {'message': 'Your password not match'} , status: 400
    else
      render json: {'message': 'Please check your inputs'} , status: 400
    end
  end

  def company_delete
    password=params[:password]
    if password
      begin
        token = request.headers['Authorization']
        decoded_token = JWT.decode(token,HMAC_SECRET,true,{ algorithm: 'HS256' }).first
        company = Company.find(decoded_token['id'])
        password = company[:password]
        password_status = BCrypt::Password.new(password) == params[:password]
        if company and password_status
          company.delete
          render json: {'message': 'Company has been deleted'} , status: 200
        elsif password_status == false
          render json: {'message': 'Worng username or password'} , status: 404
        else
          render json: {'message': 'Invalid token'} , status: 404
        end
      rescue StandardError => e
        puts e
        render json: {'message': 'Invalid token'} , status: 404
      end
    else
      render json: {'message': 'Please check your inputs'} , status: 400
    end
  end

end