$(document).on('page:change', () => {
  if(window._gaq){
    _gaq.push(['_trackPageview']);
  }
  else if(window.pageTracker){
    pageTracker._trackPageview()
  }
});


// optimizely
window._mfq = window._mfq || [];
(function() {
  var mf = document.createElement("script");
  mf.type = "text/javascript"; mf.async = true;
  mf.src = "//cdn.mouseflow.com/projects/545986a1-b095-4822-b5bb-ee94c3bd346b.js";
  document.getElementsByTagName("head")[0].appendChild(mf);
})();