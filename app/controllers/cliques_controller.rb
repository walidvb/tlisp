class CliquesController < ApplicationController
  before_action :set_clique, only: [:join, :show, :edit, :update, :destroy]
  before_action :authenticate_user!
  def join
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
  end

  # GET /cliques/new
  def new
    @clique = Clique.new
  end

  # GET /cliques/1/edit
  def edit
  end

  # POST /cliques
  # POST /cliques.json
  def create
    @clique = Clique.new(clique_params)

    respond_to do |format|
      if @clique.save
        format.html { redirect_to @clique, notice: 'Clique was successfully created.' }
        format.json { render :show, status: :created, location: @clique }
      else
        format.html { render :new }
        format.json { render json: @clique.errors, status: :unprocessable_entity }
      end
    end
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

  # DELETE /cliques/1
  # DELETE /cliques/1.json
  def destroy
    @clique.destroy
    respond_to do |format|
      format.html { redirect_to cliques_url, notice: 'Clique was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_clique
      @clique = Clique.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def clique_params
      params[:clique]
    end
end
