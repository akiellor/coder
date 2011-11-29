var src, spec, out;

$(function(){
  var JavaScriptMode = require("ace/mode/javascript").Mode;
  
  src = ace.edit("src");
  src.setTheme("ace/theme/twilight");
  src.getSession().setMode(new JavaScriptMode());
  src.setShowPrintMargin(false);

  spec = ace.edit("spec");
  spec.setTheme("ace/theme/twilight");
  spec.getSession().setMode(new JavaScriptMode());
  spec.setShowPrintMargin(false);

  out = ace.edit("out");
  out.setTheme("ace/theme/twilight");
  out.setReadOnly(true);
  out.setHighlightActiveLine(false);
  out.setShowPrintMargin(false);
  out.setPrintMarginColumn(false);
  out.renderer.setShowGutter(false);
  out.renderer.hideCursor(true);

  function run(){
    $("#runner").remove();
    out.getSession().setValue("");

    var sandbox = $('<iframe />', {id: "runner", src: "runner.html"}).bind('load', function(){ 
      this.contentWindow.run(src.getSession().getValue(), spec.getSession().getValue(), function(msg){
        out.getSession().setValue(out.getSession().getValue() + msg);
      });
    }).appendTo(document.body);
  }

  var scheduledRuns = [];

  setInterval(function(){
    var r = scheduledRuns.pop();
    r && r();
  }, 1000);

  function delayedRun(){
    scheduledRuns = [];
    scheduledRuns[scheduledRuns.length] = run;
  }

  spec.getSession().addEventListener("change", delayedRun);
  src.getSession().addEventListener("change", delayedRun);

  function showLesson(number){
    $.when(
      $.ajax({cache: false, url: '/public/lessons/' + number + '-src.js', dataType: "text"}),
      $.ajax({cache: false, url: '/public/lessons/' + number + '-spec.js', dataType: "text"})
    ).done(function(srcContent, specContent){
        src.getSession().setValue(srcContent[0]);
        spec.getSession().setValue(specContent[0]);
    }).fail(function(e){ console.log(this) });
  }

  showLesson(window.location.hash.substring(1));
});
