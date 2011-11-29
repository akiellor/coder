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

  var scheduledRuns = [];

  setInterval(function(){
    var r = scheduledRuns.pop();
    r && r();
  }, 1000);

  function delayedRun(){
    scheduledRuns = [];
    scheduledRuns[scheduledRuns.length] = function(){
      function print(msg){
        out.getSession().setValue(out.getSession().getValue() + msg);
      }
 
      out.getSession().setValue("");
      jasmine.iframeRunner(print, "runner").run([src.getSession().getValue(), spec.getSession().getValue()]);
    }
  }

  spec.getSession().addEventListener("change", delayedRun);
  
  spec.getSession().addEventListener("change", function(){
    datasources.lessons().update(window.location.hash.substring(1), function(lesson){
      lesson.spec = spec.getSession().getValue();
      return lesson;
    });
  });
  
  src.getSession().addEventListener("change", delayedRun);

  src.getSession().addEventListener("change", function(){
    datasources.lessons().update(window.location.hash.substring(1), function(lesson){
      lesson.src = src.getSession().getValue();
      return lesson;
    });
  });

  datasources.lessons().get(window.location.hash.substring(1), function(lesson){
    src.getSession().setValue(lesson.src);
    spec.getSession().setValue(lesson.spec);
  });
});
