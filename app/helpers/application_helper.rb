module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Passsport"
    end
  end

end
