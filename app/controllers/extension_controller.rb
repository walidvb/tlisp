class ExtensionController < ApplicationController

  def show
    headers['CONTENT-TYPE'] = 'application/javascript'
    sc = %{
      (function(){
        var div = document.createElement('div');
        div.id = 'diggersdelights';
        div.innerHTML = 'diggersdelights';
        document.body.append(div);
        console.log(div);
      })()
    }.delete("\n")
    render inline: sc
  end
end
