class LinksController < ApplicationController
  before_action :set_link, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!
  
  def filters
    cliques = current_user.cliques.map do |clique| 
      clique.serializable_hash.merge({
          users: clique.users.select{|us| us != current_user} 
      })
    end
    render json: {      
      cliques: cliques,
      tags: all_tags,
      genres: all_tags(:genre),
    }
  end

  def link_form_details
    url = params[:url]
    @link = Link.new(url: url)
    @link.add_oembed
    @tags = all_tags.map(&:name)
    @genres = all_tags(:genre).map(&:name)
    @playlists = current_user.playlists
    @playlists_as_collection = Hash[@playlists.map{|pl| [pl.name, pl.id]}]
    @cliques = current_user.cliques
    render json: {
      link: @link,
      playlists: @playlists,
      cliques: @cliques,
      tags: @tags,
    }
  end

  def search
    user_ids = params[:users]
    @links = Link.where(user_id: user_ids)
  end
  # GET /links
  # GET /links.json
  def index
    @cliques = current_user.cliques
    @users = @cliques.map(&:users).flatten.select{|us| us != current_user}
    @links = Link.where(user: @users)

    if params[:users] 
      @links = search
    else
      if user_id = params[:user_id].presence
        @links = @links.where(user_id: user_id)
      end
      if tag_names = params[:tag_names].presence
        @links = @links.tagged_with(tag_names)
      end
    end
  end

  # GET /links/1
  # GET /links/1.json
  def show
    headers['X-Frame-Options'] = "ALLOWALL"
    render layout: session[:modal] ? "iframe" : true
  end

  # GET /links/new
  def new
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
      if @link.save
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
      pps = params.require(:link).permit(
        :url, 
        :description, 
        :published, 
        :is_a_set,
        clique_ids: [],
        playlist_ids: [],
        tag_list: [], 
        genre_list: []
      ).merge(
          user: current_user,
      )
      if playlist_ids = pps[:playlist_ids]
        pps[:playlist_ids] = playlist_ids.map do |pid|
          if !pid.blank? && !Playlist.exists?(pid)
            pl = Playlist.create!(name: pid, user: current_user)
            pl.id
          else
            pid
          end
        end.compact
      end
      pps
    end
end
