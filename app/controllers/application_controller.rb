class ApplicationController < ActionController::Base
  protect_from_forgery
  
  before_filter :redirect_to_https
  before_filter :authenticate_user!

  # Handle unauthorized access with a good old fashioned 'forbidden'
  rescue_from CanCan::AccessDenied do |exception|
    render :file => "#{Rails.root}/public/403.html", :status => :forbidden
  end

  rescue_from ActiveRecord::RecordNotFound, :with => :render_404

  protected
  def render_404
    respond_to do |format|
      format.html do
        render :file => Rails.root.join('public', '404.html'),
          :status => '404'
      end
      format.xml do
        render :nothing => true, :status => '404'
      end
    end
  end
  def redirect_to_https
      #redirect_to :protocol => "https://" unless (request.ssl? || local_request?)
      @cont = controller_name

      @act = action_name

      redirect_to "https://biemedia-fulcrum.heroku.com/#{@cont}/#{@act}/#{params[:id]}" unless (@request.ssl? or local_request?)
  end
end
