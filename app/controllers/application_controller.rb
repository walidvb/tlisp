class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def authenticate_user_from_token!
    token = params[:auth_token].presence

    if !user_signed_in?
      if token && user = User.find_by_auth_token(token.to_s)
        sign_in user, store: true
      else
        respond_to do |format|
          format.json{ head :unauthorized }
          format.html{ redirect_to(new_user_registration_path)}
        end
      end
    end
  end

  # Devise
  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_filter :reject_locked!, if: :devise_controller?


  # Devise permitted params
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(
      :email,
      :password,
      :password_confirmation,
      :name,
      )
    }
    devise_parameter_sanitizer.permit(:account_update) { |u| u.permit(
      :email,
      :password,
      :password_confirmation,
      :current_password,
      :name,
      )
    }
  end

  # Redirects on successful sign in
  def after_sign_in_path_for(resource)
    resource.admin? ? rails_admin.dashboard_path : root_path
  end

  # Auto-sign out locked users
  def reject_locked!
    if current_user && current_user.locked?
      sign_out current_user
      user_session = nil
      current_user = nil
      flash[:alert] = "Your account is locked."
      flash[:notice] = nil
      redirect_to root_url
    end
  end
  helper_method :reject_locked!

  # Only permits admin users
  def require_admin!
    authenticate_user!

    if current_user && !current_user.admin?
      redirect_to root_path
    end
  end
  helper_method :require_admin!

  # /Devise


  # HELPERS

  def all_tags context = :tags
    ActsAsTaggableOn::Tagging.where(context: context).select(:tag_id).distinct.includes(:tag).map(&:tag)
  end

end
