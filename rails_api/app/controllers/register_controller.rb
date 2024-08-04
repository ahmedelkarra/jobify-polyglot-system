class RegisterController < ApplicationController
  def register_form
    render json: {'message': 'wlcome in register api rails'}
  end
end
