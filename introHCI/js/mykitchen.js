var myKitchen = JSON.parse(localStorage.getItem('myKitchen'));
// Call this function when the page loads (the jQuery "ready" event)
$(document).ready(function() {
  var source = $('#category-template').html();
  var template = Handlebars.compile(source);
  var parentDiv = $("#row");
  localStorage.setItem('address',JSON.stringify("mykitchen2.html"));
  for(var i = 0; i < myKitchen.length; i++){
    var curData = myKitchen[i];
    var curHtml = template(curData);
    parentDiv.append(curHtml);
    for(var j = 0; j < curData['items'].length; j++){
      var div = document.createElement('div');
      div.setAttribute('class', 'panel-body');
      div.innerHTML = "<a style='color:black;float:right;' title='Delete this ingredient' class='cross'>&#x2715</a><a style='float:right;margin-right:6;' href='cookusekitchenfood.html?var="+curData['items'][j]+"'><img title='Cook this ingredient' src='images/cookwithouttext.png' height='21' alt='p'></a><t>"+curData['items'][j]+"</t>";
      document.getElementById("collapse"+i).appendChild(div);
    }
  }

  $('.cross').click(function() {
    var ss = $(this).val();
    var item = this.parentNode.getElementsByTagName("t")[0].textContent;
    this.parentNode.remove();
    var deleted = '';
    for(var i = 0; i < myKitchen.length; i++){
      var curData = myKitchen[i];
      var index = curData['items'].indexOf(item);
      if (index > -1) {
        deleted = curData['items'][index]
        curData['items'].splice(index, 1);
      }
    }
    var x = document.getElementById("snackbar");
    x.innerHTML = "Deleted item "+ deleted;
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    localStorage.setItem('myKitchen',JSON.stringify(myKitchen));
    /*$(this).parent().remove();*/
  });
})
