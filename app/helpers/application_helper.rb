module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | DiggersDelights"
    end
  end

end
