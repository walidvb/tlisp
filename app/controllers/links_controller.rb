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

# GET /links
# GET /links.json
def index
  clique_ids = current_user.clique_ids
  @link_assignments = LinkCliqueAssignment
  .order("created_at DESC")
  .includes(link: [:users, :tags])
  .visible
  .oembedable

  base_query = @link_assignments.clone
  if params[:custom] == 'only-me'
    @link_assignments = @link_assignments.where(user: current_user)
  else
    @link_assignments = @link_assignments
    .where(clique_id: clique_ids)
    .where.not(user: current_user)
  end

  # Return Walid's links if there are none in the clique yet
  if @link_assignments.count.zero?
    @link_assignments = base_query.where(user_id: 1)
  else
    if u_ids = params[:users].presence
      @link_assignments = @link_assignments.where(user: u_ids)
    end
    if c_ids = params[:cliques].presence
      # TODO remove clique that the user is not part of
      # new_c_ids = c_ids.select{|c_id| clique_ids.include?(c_id)}
      @link_assignments = @link_assignments.where(clique_id: c_ids)
    end
  end

  @links = Link.joins(:link_clique_assignments)
  .order("created_at DESC")
  .where('link_id IN (?)', @link_assignments.map(&:link_id))
  .uniq
  # TODO optimize the search by mood
  if mood = params[:mood].presence
    mood = mood.to_i
    @links = @links.select do |l|
      l.mood.nil? || (l.mood <= mood + 20 && l.mood >= mood - 20)
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
  # TODO: handle tag by user or clique. htf? dynamic scopes by clique maybe?
  # TODO: move this to a LinkCreatorService
  # remove all associations
  _link_params = link_params
  clique_ids = _link_params.delete(:clique_ids)
  playlist_ids = _link_params.delete(:playlist_ids) || []
  # find or create link
  @link = Link.find_by_url(_link_params[:url]) || Link.new(_link_params)
  # add associations
  @link.playlist_ids = @link.playlist_ids.concat(playlist_ids)
  @link.assign_to(users: [current_user], cliques: clique_ids, visible: _link_params[:published])
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
  :mood,
  clique_ids: [],
  playlist_ids: [],
  tag_list: [], 
  genre_list: []
  )
  # ensure we don't parse the params twice
  if !@params_read
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
    @params_read = true
  end
  pps
end
end
