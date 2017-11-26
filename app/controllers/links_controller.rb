class LinksController < ApplicationController
  before_action :set_link, only: [:show, :edit, :update, :destroy]

  # GET /links
  # GET /links.json
  def index
    @users = User.all
    @tags = all_tags
    @genres = all_tags :genre
    @links = Link.includes(:user).all
    if user_id = params[:user_id].presence
      @links = @links.where(user_id: user_id)
    end
    if tag_names = params[:tag_names].presence
      @links = @links.tagged_with(tag_names)
    end
  end

  # GET /links/1
  # GET /links/1.json
  def show
    headers['X-Frame-Options'] = "*"
    render layout: session[:modal] ? "iframe" : true
  end

  # GET /links/new
  def new
    @tags = all_tags.map(&:name)
    @genres = all_tags(:genre).map(&:name)
    @link = Link.new clique_id: current_user.clique_ids.first, url: params[:href]
    @playlists = current_user.playlists
    @playlists_as_collection = Hash[@playlists.map{|pl| [pl.name, pl.id]}]
    headers['X-Frame-Options'] = "*"
    session[:modal] = params[:modal].present?
    render layout: session[:modal] ? "iframe" : true
  end

  # GET /links/1/edit
  def edit
  end

  # POST /links
  # POST /links.json
  def create
    @link = Link.new(link_params)
    respond_to do |format|
      if @link.is_duplicate?
        format.html { redirect_to @link, notice: 'Link already existed.' }
        format.json { render :show, status: :found, location: @link }
      elsif @link.save
        format.html { redirect_to @link, notice: 'Link was successfully created.' }
        format.json { render :show, status: :created, location: @link }
      else
        format.html { render :new }
        format.json { render json: @link.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /links/1
  # PATCH/PUT /links/1.json
  def update
    respond_to do |format|
      if @link.update(link_params)
        format.html { redirect_to @link, notice: 'Link was successfully updated.' }
        format.json { render :show, status: :ok, location: @link }
      else
        format.html { render :edit }
        format.json { render json: @link.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /links/1
  # DELETE /links/1.json
  def destroy
    @link.destroy
    respond_to do |format|
      format.html { redirect_to links_url, notice: 'Link was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_link
      @link = Link.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def link_params
      params.require(:link).permit(
        :url, 
        :description, 
        :published, 
        :is_a_set,
        :clique_id,
        playlist_ids: [],
        tag_list: [], 
        genre_list: []
      ).merge(
          user: current_user,
      )
    end
end
