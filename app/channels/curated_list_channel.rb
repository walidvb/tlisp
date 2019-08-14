class CuratedListChannel < ApplicationCable::Channel
  def subscribed
    curated_list = CuratedList.find(params[:id])
    puts "================"
    puts curated_list
    stream_for(curated_list)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
