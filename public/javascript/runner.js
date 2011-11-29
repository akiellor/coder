var jasmine = {};

jasmine.iframeRunner = function(print, name){
  return {
    run: function(scripts, callback){
      $("#" + name).remove();

      var sandbox = $('<iframe />', {id: name, src: "runner.html"}).bind('load', function(){ 
        this.contentWindow.run(scripts, print, callback);
      }).appendTo(document.body);
    }
  }
}


