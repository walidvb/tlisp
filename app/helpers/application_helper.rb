module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Tsilp"
    end
  end

end
