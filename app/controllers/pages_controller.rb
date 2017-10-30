class PagesController < ApplicationController
  before_action :authenticate_user!, only: [
    :inside
  ]

  def home
    bookmarklet_js = %{
      function httpGet(theUrl, callback){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() { 
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
      }
      var url = '//__TSILP_DOMAIN__/static/modaljs?ref='+location.href;
      httpGet(url, function(res){
          var div = document.createElement('div');
          div.innerHTML = res;
          var scripts = div.children;
          for (var i = 0; i < scripts.length; i++) {
              var element = scripts[i];
              var script = document.createElement('script');
              script.src = element.src;
              document.body.appendChild(script);
          }
          console.log(div);
      });
    }
    @bookmarklet = "javascript:(function(){"+bookmarklet_js.gsub("__TSILP_DOMAIN__", ENV['DOMAIN'])+"})();"
  end

  def inside
  end
  
  
  def email
    @name = params[:name]
    @email = params[:email]
    @message = params[:message]

    if @name.blank?
      flash[:alert] = "Please enter your name before sending your message. Thank you."
      render :contact
    elsif @email.blank? || @email.scan(/\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i).size < 1
      flash[:alert] = "You must provide a valid email address before sending your message. Thank you."
      render :contact
    elsif @message.blank? || @message.length < 10
      flash[:alert] = "Your message is empty. Requires at least 10 characters. Nothing to send."
      render :contact
    elsif @message.scan(/<a href=/).size > 0 || @message.scan(/\[url=/).size > 0 || @message.scan(/\[link=/).size > 0 || @message.scan(/http:\/\//).size > 0
      flash[:alert] = "You can't send links. Thank you for your understanding."
      render :contact
    else
      ContactMailer.contact_message(@name,@email,@message).deliver_now
      redirect_to root_path, notice: "Your message was sent. Thank you."
    end
  end

end
