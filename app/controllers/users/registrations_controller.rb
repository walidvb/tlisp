class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]


  skip_before_action :verify_authenticity_token, if: -> { request.format.json? }
  respond_to :json

  # GET /resource/sign_up
  def new
    # @clique_id = session[:join_clique_id]
    super
  end

  def onboarding
    authenticate_user!
  end
  
  # POST /resource
  def create
    build_resource(sign_up_params)
    clique = Clique.find(params[:clique])
    resource.cliques << clique
    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        sign_in resource
        render json: {user: resource}
       # respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        # respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      # respond_with resource
    end
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      if is_flashing_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, bypass: true
      render json: {user: resource}
      #respond_with resource, location: after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  def after_update_path_for(resource)
      return ENV['DOMAIN']
      params[:redirect_to].present? ? params[:redirect_to] : user_path(resource)
  end
  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
      devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(
      :email,
      :password,
      :password_confirmation,
      :name,
      clique_ids: []
      )
    }
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(
      :email,
      :password,
      :password_confirmation,
      :current_password,
      :name,
      :initials
      )
    }
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    onboarding_path
  end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
