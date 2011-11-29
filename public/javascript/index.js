$(function(){
  datasources.lessons().index(function(data){
    $.each(data, function(index, info){
      datasources.lessons().get(info.id, function(lesson){
        jasmine.iframeRunner(function(){}, "runner" + index).run([lesson.src, lesson.spec], function(runner){
          var stat = runner.results().passed() ? "PASS" : "FAIL";
          $("<li></li>")
            .append($("<a />", {href:"/public/html/exercise.html#" + lesson.id, target: "_blank"}).text(lesson.name + " "))
            .append($("<span />", {"class": "label " + (runner.results().passed() ? "success" : "important")}).text(stat))
            .appendTo($("#lessons"));
        });
      });
    });
  });
});
