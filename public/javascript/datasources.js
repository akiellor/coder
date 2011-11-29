var datasources = {};

datasources.lessons = function(){
  function getLessons(){
    if(!localStorage) { return []; }
    return JSON.parse(localStorage.getItem('lessons'));
  }

  function setLessons(obj){
    if(!localStorage) { return; }
    localStorage.setItem('lessons', JSON.stringify(obj));
  }

  function setLesson(number, lesson){
    var l = getLessons();
    l[+number] = lesson;
    setLessons(l);
  }

  if(localStorage && !localStorage.lessons){
    setLessons([]);
  }

  return {
    get: function(number, callback){
      if(!!getLessons()[+number]){
        callback(getLessons()[+number]);
      }else{
        $.when(
          $.ajax({cache: false, url: '/public/lessons/' + number + '-src.js', dataType: "text"}),
          $.ajax({cache: false, url: '/public/lessons/' + number + '-spec.js', dataType: "text"})
          ).done(function(srcContent, specContent){
            setLesson(+number, {src: srcContent[0], spec: specContent[0]});
            callback(getLessons()[+number]);
        }).fail(function(e){ console.log(this) });
      }
    },
    update: function(number, mutator){
      this.get(number, function(lesson){
        setLesson(number, mutator(lesson));
      });
    }
  }
}


