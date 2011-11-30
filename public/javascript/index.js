$(function(){
  function showLessons(lessons){
    $.each(lessons, function(index, lesson){
      var stat = lesson.passed ? "PASS" : "FAIL";
      $("<li></li>")
      .append($("<a />", {href:"/public/html/exercise.html#" + lesson.id, target: "_blank"}).text(lesson.name + " "))
      .append($("<span />", {"class": "label " + (lesson.passed ? "success" : "important")}).text(stat))
      .appendTo($("#lessons"));
    });
  }

  function loadLessons(){
    datasources.lessons().index(function(data){
      var loadedLessons = [];
      
      $.each(data, function(index, info){
        datasources.lessons().get(info.id, function(lesson){
          jasmine.iframeRunner(function(msg) { console.log(msg); }, "runner" + index).run([lesson.src, lesson.spec], function(runner){
            lesson.passed = runner.results().passed();
            loadedLessons.push(lesson);

            if(loadedLessons.length === data.length){
              loadedLessons.sort(function(a, b){ return a.id > b.id; });
              showLessons(loadedLessons);
            }
          });
        });
      });
    });
  }

  $("#reload").click(function(){
    localStorage.lessons = "[]";
    $("#lessons").empty();
    loadLessons();
  });

  loadLessons();
});
