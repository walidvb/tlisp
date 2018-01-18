class Users::NotificationsWithDeviseController < ActivityNotification::NotificationsWithDeviseController
  # GET /:target_type/:target_id/notifications
  def index
      set_index_options
      load_index if params[:reload].to_s.to_boolean(true)
      respond_to do |format|
        format.json { render json: @notifications.to_json(include: { 
          notifiable: {
            only: [:id, :url],
            methods: [:title, :thumbnail_url, :html]
          },
          notifier: {
            only: [:name, :initials]
          },
        }) }
      end
  end

  # POST /:target_type/:target_id/notifications/open_all
  # def open_all
  #   super
  # end

  # GET /:target_type/:target_id/notifications/:id
  # def show
  #   super
  # end

  # DELETE /:target_type/:target_id/notifications/:id
  # def destroy
  #   super
  # end

  # POST /:target_type/:target_id/notifications/:id/open
  # def open
  #   super
  # end

  # GET /:target_type/:target_id/notifications/:id/move
  # def move
  #   super
  # end

  # No action routing
  # This method needs to be public since it is called from view helper
  # def target_view_path
  #   super
  # end

  # protected

  def set_target
    @target = current_user
  end

  # def set_notification
  #   super
  # end

  # def set_index_options
  #   super
  # end

  # def load_index
  #   super
          # @notifications = 
          # case @index_options[:filter]
          # when :opened, 'opened'
          #   @target.opened_notification_index_with_attributes(@index_options)
          # when :unopened, 'unopened'
          #   @target.unopened_notification_index_with_attributes(@index_options)
          # else
          #   @target.notification_index_with_attributes(@index_options)
          # end
  # end

  # def controller_path
  #   super
  # end

  # def set_view_prefixes
  #   super
  # end

  # def return_back_or_ajax
  #   super
  # end

  # def authenticate_devise_resource!
  #   super
  # end

  # def authenticate_target!
  #   super
  # end
end
