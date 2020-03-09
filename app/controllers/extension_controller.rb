class ExtensionController < ApplicationController

  def show
    headers['CONTENT-TYPE'] = 'application/javascript'
    sc = %{
      (function(){
        var div = document.createElement('div');
        div.id = 'diggersdelights';
        document.body.append(div);
      })()
    }.delete("\n")
    render inline: sc
  end
end
