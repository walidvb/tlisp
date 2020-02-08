class LikeController < ApplicationController
  before_action :authenticate_user!

  def toggle
    if link_assignment_for_user.nil?
      handle_new_like
    else
      handle_remove_like
    end
  end

  def status
    render json: { liked: !link_assignment_for_user.nil?}
  end

  private 

  def link_assignment_for_user
    @link_assignement = LinkCliqueAssignment.find_by(link: Link.find_by_url(params[:url]))
  end

  def handle_new_like
    @link = Link.find_by_url(params[:url]) || Link.new(url: params[:url])
    @link.assign_to(users: [current_user])
    if @link.save
      render json: { liked: 1}
    else
      render json: { errors: @link.errors}, status: :unprocessable_entity
    end
  end

  def handle_remove_like
    @link_assignement.destroy
    render json: { liked: 0 }, status: 200
    # current_user.link_clique_assignments.where(link: @link, clique: nil).map(&:destroy)
  end
end
