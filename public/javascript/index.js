$(function(){
  datasources.lessons().index(function(data){
    $.each(data, function(index, lesson){
      $("<li></li>").append(
        $("<a />", {href:"/public/html/exercise.html#" + lesson.id, target: "_blank"}).text(lesson.name)
      ).appendTo($("#lessons"));
    });
  });
});
