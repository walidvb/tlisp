class CliquesController < ApplicationController
  before_action :set_clique, only: [:join, :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  skip_before_action :authenticate_user!, only: [:join, :show]

  def join
    @inviter = params[:by]
    @links = @clique.links.oembeddable.uniq
    session[:join_clique_id] = @clique.id
  end
  
  # GET /cliques
  # GET /cliques.json
  def index
    @cliques = Clique.all
  end
  
  # GET /cliques/1
  # GET /cliques/1.json
  def show
    @users = @clique.users
  end

  # GET /cliques/new
  def new
    @clique = Clique.new
  end

  # GET /cliques/1/edit
  def edit
  end

  # PATCH/PUT /cliques/1
  # PATCH/PUT /cliques/1.json
  def update
    respond_to do |format|
      if @clique.update(clique_params)
        format.html { redirect_to @clique, notice: 'Clique was successfully updated.' }
        format.json { render :show, status: :ok, location: @clique }
      else
        format.html { render :edit }
        format.json { render json: @clique.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_clique
      @clique = Clique.find(params[:clique_id] || params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def clique_params
      params[:clique]
    end
end
