// Call this function when the page loads (the jQuery "ready" event)
var backAdd = JSON.parse(localStorage.getItem('address'));
$(document).ready(function() {
  var source = $('#list-template').html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#food_list");
  var myKitchen = JSON.parse(localStorage.getItem('myKitchen'));

  for(var i = 0; i < myKitchen.length; i++){
    var curData = myKitchen[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    for(var j = 0; j < curData['items'].length; j++){
      var div = document.createElement('div');
      div.setAttribute('class', 'item');
      div.innerHTML = "<input type='checkbox' id='box' style='margin-top:15px;margin-left:15px;margin-bottom:15px;margin-right:10px;'><t>"+curData['items'][j]+"</t>";
      document.getElementById("collapse"+i).appendChild(div);
    }
  }

  var queryParams = new URLSearchParams(window.location.search);
  chosenIng = queryParams.get('var');
  $('.item').each(function(){
    item = this.getElementsByTagName("t")[0].textContent;
    if(chosenIng == item){
      this.children[0].checked=true;
    }
  })

  if(backAdd == "mykitchen2.html"){
		console.log(backAdd);
		$("#back").attr("href", backAdd);
	}
})


$('#make_button').click(function(){
  var stringArr = [];
  $('.item').each(function(){
    var checked = this.children[0].checked;
    if(checked){
      stringArr.push((this).textContent);
    }
  })
  if(stringArr.length == 0){
    alert("Please choose at least one ingredient!");
  }
  else{
    window.location.href = "cookrecipelist.html";
    localStorage.setItem('address',JSON.stringify("cookusekitchenfood.html"));
  }
  localStorage.setItem('recipe_idx',JSON.stringify([]));
  localStorage.setItem('currentIng',JSON.stringify(stringArr));
})


$('#chooseAll').click(function(){
  console.log(document.getElementById("chooseAll").checked);
  if(!document.getElementById("chooseAll").checked){
    $('.item').each(function(){
      var checked = this.children[0].checked;
      if(checked){
        this.children[0].checked = false;
      }
    })
  }
  else{
    $('.item').each(function(){
      var checked = this.children[0].checked;
      if(!checked){
        this.children[0].checked = true;
      }
    })
  }
})
