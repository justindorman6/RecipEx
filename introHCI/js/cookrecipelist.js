var chosenIng = JSON.parse(localStorage.getItem('currentIng'));
var recipeData = JSON.parse(localStorage.getItem('recipeData'));
var backAdd = JSON.parse(localStorage.getItem('address'));
var id = 0;
$(document).ready(function() {
  var queryParams = new URLSearchParams(window.location.search);
	id = queryParams.get('id');
  add = queryParams.get('add');
  $("#back").attr("href", backAdd);
  console.log(backAdd);

  if(id == 2){
    byCalory();
  }
  else if (id == 3) {
    byTime();
  }
  else{
    document.getElementById("ingredient").style["background"] = "#CBCACA";
    document.getElementById("calories").style["background"] = "#F1F1F1";
    document.getElementById("time").style["background"] = "#F1F1F1";
    console.log(chosenIng);
    var dict = {};
    for(var i = 0; i < recipeData.length; i ++){
      currRecipe = recipeData[i];
      var recipeCount = 0;
      for(var j = 0; j < currRecipe['category'].length; j++){
        for(var k = 0; k < chosenIng.length; k++){
          if(currRecipe['category'][j] == chosenIng[k]){
            recipeCount += 1;
          }
        }
      }
      dict[i] = recipeCount;
    }

    var items = Object.keys(dict).map(function(key) {
      return [key, dict[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    var recipeList = {};
    var recipe_idx = [];
    for (var key in items) {
      if (items.hasOwnProperty(key)) {
          if(items[key][1]>0){
            recipe_idx.push(items[key][0]);
            recipeList[items[key][0]] = items[key][1];
          }
      }
    }
    localStorage.setItem('recipe_idx',JSON.stringify(recipe_idx));
    console.log(recipe_idx);
    if(recipe_idx.length<1){
      var parentDiv = $("#container");
      parentDiv.empty();
      var div = document.createElement('div');
      div.setAttribute('class', 'container');
      div.innerHTML = "No recipe found, please try other ingredients.";
      console.log(div);
      document.getElementById("container").appendChild(div);
      var div = document.createElement('div');
      div.setAttribute('class', 'container');
      div.innerHTML = "<a id='back_button' href='"+backAdd+"'>Go back</a>";
      document.getElementById("container").appendChild(div);
    }else{

      var source = $('#recipe-template').html();
      var template = Handlebars.compile(source);
      var parentDiv = $("#container");
      parentDiv.empty();

      for(var i = 0; i < recipe_idx.length; i++){
        var curData = recipeData[recipe_idx[i]];
        var curHtml = template(curData);
        parentDiv.append(curHtml);
        document.getElementById(recipe_idx[i]).innerHTML="Match "+recipeList[recipe_idx[i]]+" ingredients";
      }
      var x = document.getElementById("snackbar");
      x.innerHTML = "Filter recipes by ingredients matched.";
      x.className = "show";
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
  }
})

$('#calories').click(byCalory())

function byCalory(){
  if(id == 2){
    document.getElementById("ingredient").style["background"] = "#F1F1F1";
    document.getElementById("calories").style["background"] = "#CBCACA";
    document.getElementById("time").style["background"] = "#F1F1F1";
  }
  var recipe_idx = JSON.parse(localStorage.getItem('recipe_idx'));
  if(recipe_idx.length<1){
    var parentDiv = $("#container");
    parentDiv.empty();
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.innerHTML = "No recipe found, please try other ingredients.";
    document.getElementById("container").appendChild(div);
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.innerHTML = "<a id='back_button' href='"+backAdd+"'>Go back</a>";
    document.getElementById("container").appendChild(div);
  }else{
    recipeCal = {}
    for(var i = 0; i < recipe_idx.length; i++){
      for(var j = 0; j < recipeData.length; j ++){
        if(recipe_idx[i] == recipeData[j]['id']){
          recipeCal[recipe_idx[i]] = recipeData[j]['calories']
        }
      }
    }
    var items = Object.keys(recipeCal).map(function(key) {
      return [key, recipeCal[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    items = items.reverse();
    console.log(items);

    var source = $('#recipe-template').html();
    var template = Handlebars.compile(source);
    var parentDiv = $("#container");
    parentDiv.empty();

    for(var i = 0; i < items.length; i++){
      var curData = recipeData[items[i][0]];
      var curHtml = template(curData);
      parentDiv.append(curHtml);
      document.getElementById(items[i][0]).innerHTML="Calories: "+items[i][1];
      document.getElementById(items[i][0]).style="position: absolute;bottom: -6px;left: 40%;color:black; font-weight: bold; opacity: 0.8; font-size:12px;";
    }
    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter recipes by Calories.";
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}


$('#time').click(byTime())
function byTime(){
  if(id == 3){
    document.getElementById("ingredient").style["background"] = "#F1F1F1";
    document.getElementById("calories").style["background"] = "#F1F1F1";
    document.getElementById("time").style["background"] = "#CBCACA";
  }
  var recipe_idx = JSON.parse(localStorage.getItem('recipe_idx'));
  if(recipe_idx.length<1){
    var parentDiv = $("#container");
    parentDiv.empty();
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.innerHTML = "No recipe found, please try other ingredients.";
    document.getElementById("container").appendChild(div);
    var div = document.createElement('div');
    div.setAttribute('class', 'container');
    div.innerHTML = "<a id='back_button' href='"+backAdd+"'>Go back</a>";
    document.getElementById("container").appendChild(div);
  }else{
    recipeTime = {}
    for(var i = 0; i < recipe_idx.length; i++){
      for(var j = 0; j < recipeData.length; j ++){
        if(recipe_idx[i] == recipeData[j]['id']){
          recipeTime[recipe_idx[i]] = recipeData[j]['time']
        }
      }
    }
    var items = Object.keys(recipeTime).map(function(key) {
      return [key, recipeTime[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });
    items = items.reverse();
    console.log(items);

    var source = $('#recipe-template').html();
    var template = Handlebars.compile(source);
    var parentDiv = $("#container");
    parentDiv.empty();

    for(var i = 0; i < items.length; i++){
      var curData = recipeData[items[i][0]];
      var curHtml = template(curData);
      parentDiv.append(curHtml);
      document.getElementById(items[i][0]).innerHTML="Cooking time: "+items[i][1]+" min";
      document.getElementById(items[i][0]).style="position: absolute;bottom: -6px;right: 10px;color:black; font-weight: bold; opacity: 0.8; font-size:12px;";
    }
    console.log(recipe_idx+"here");
    var x = document.getElementById("snackbar");
    x.innerHTML = "Filter recipes by cooking time.";
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }
}
