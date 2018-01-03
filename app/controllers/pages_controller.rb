class PagesController < ApplicationController
  before_action :authenticate_user!, only: [
    :inside
  ]

  def home
    redirect_to inside_path if user_signed_in?
  end

  def inside
    if user_signed_in?
      domain = ENV['DOMAIN']
      bookmarklet_js = %{
        var div = document.createElement('div');
        var overflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.DDCloseIframe = function(){
          div.remove();
          document.body.overflow = overflow;
        };
        div.style.cssText = "position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,.5); display: flex; align-items: center; justify-content:center;flex-direction: column;z-index:10000; font-size: 16px;"
        var iframe = document.createElement('iframe');
        var iframeContainer = document.createElement('div');
        iframeContainer.style.position = 'relative';
        var close = document.createElement('div');
        close.innerText = "╳";
        close.style.cssText = "color: white;position: absolute;cursor: pointer;right: 15px;top: 15px;"
        iframeContainer.append(close);
        close.addEventListener('click',DDCloseIframe);
        iframe.frameBorder = 'none'
        iframe.style.cssText = "max-width: 100%; min-width: 900px; height: 80vh; z-index: 10000";
        iframe.src = "#{domain}/tracks/new?modal=true&version=0.1&url="+encodeURIComponent(window.location)
        iframeContainer.append(iframe);
        div.append(iframeContainer);
        document.body.append(div);


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
