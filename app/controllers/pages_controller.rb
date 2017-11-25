class PagesController < ApplicationController
  before_action :authenticate_user!, only: [
    :inside
  ]

  def home
    redirect_to inside_path if user_signed_in?
  end

  def inside
    if user_signed_in?
      @domain = ENV['DOMAIN']
      bookmarklet_js = %{
        window.__DIGGERS_DELIGHTS_USER_ID__ = "#{current_user.auth_token}";
        function httpGet(theUrl, callback){
          var xmlHttp = new XMLHttpRequest();
          xmlHttp.onreadystatechange = function() { 
              if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                  callback(xmlHttp.responseText);
          }
          xmlHttp.open("GET", theUrl, true); // true for asynchronous
          xmlHttp.send(null);
        }
        var url =  '#{@domain}/static/modaljs?ref='+location.href+'&auth_token=#{current_user.auth_token}';

        httpGet(url, function(res){
            var div = document.createElement('div');
            div.innerHTML = res;
            var scripts = div.children;
            var domain = scripts[0].innerHTML;
            eval(domain);
            for (var i = 1; i < scripts.length; i++) {
                var element = scripts[i];
                var script = document.createElement('script');
                script.src = element.src;
                document.body.appendChild(script);
            }
        });
      }
      @bookmarklet = "javascript:(function(){"+bookmarklet_js+"})();"
    end
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
