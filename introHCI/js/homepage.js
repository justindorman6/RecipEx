// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  var source = $('#favorite-template').html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#bar");
  favoriteList = JSON.parse(localStorage.getItem('favData'));
  console.log(favoriteList.length);

  for(var i = 0; i < favoriteList.length; i++){
    var curData = favoriteList[i];
    var curHtml = template(curData);
    parentDiv.prepend(curHtml);
  }

  recipeData = JSON.parse(localStorage.getItem('recipeData'));
  var rec_source = $('#recommend-template').html();
  var rec_template = Handlebars.compile(rec_source);
  var rec_parentDiv = $("#body");
  var temptList = [];
  var i = 0;
  while(i < 6){
    var id = getRandomInt(recipeData.length);
    console.log(id);
    if(temptList.indexOf(id) == -1){
      temptList.push(id);
      var curData = recipeData[id];
      var curHtml = rec_template(curData);
      rec_parentDiv.append(curHtml);
      i++;
    }
  }
  val = JSON.parse(localStorage.getItem('firstLogin'));
  if(val == "1"){
    /*
    alert("New user? \n- You can find instructions in 'help' of your 'Profile'\n");
    */
    localStorage.setItem('firstLogin', JSON.stringify("0"));
  }
  localStorage.setItem('address',JSON.stringify("homepage.html"));
})

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
