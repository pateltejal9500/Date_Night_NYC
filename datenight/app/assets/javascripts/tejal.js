$(function(){
 datesLoad1()

function datesLoad1(){
  $.get("/plans", function(user){
    var innards = "<div class='dropdown'><button class='btn btn-default dropdown-toggle style' type='button' id='dropdownMenu1' data-toggle='dropdown'>DATES</button><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
    if (user.plans.length != 0){
      for (var i =0; i < user.plans.length; i ++){
       
        innards += "<li role='presentation'><a id=" + user.plans[i].id + " class ='contact' role='menuitem' tabindex='-1' href='#'>" + user.plans[i].date+ "</a></li>"
       
    }
    } else {
      innards += "<li role='presentation'><a class ='contact' role='menuitem' tabindex='-1'> NO CURRENT DATES</a></li>"
    }
    innards += "<li role='presentation' class='divider'></li><li role='presentation'><a class='newDate'role='menuitem' tabindex='-1' href='#'>NEW DATE</a></li></div>"
    $("#date").html(innards)  
     newDate1()

  })


}



function newDate1(){
  $(".newDate").click(function(event){
   
    $("#new").append("<h2>DATE INFO</h2><input type='date' name='date'>")
    makeNeighboorhood1()
   

  
  })
  

}


function makeNeighboorhood1(){

  $.get("/neighborhoods", function(neighborhood){
    neighborhoods = _.sortBy(neighborhood, function(neighborhoodObject) {return neighborhoodObject.name})
    var innards = "<select name ='neighborhood' class='neighborhood'>"
    var div = document.createElement('div');
    $(div).attr('id', 'option');
    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].zipcode+">" + neighborhoods[i].name + "</option>"
      }
    innards += "</select>"+"<button id='search'>ENTER</button> <input name='authenticity_token' value='form_authenticity_token()' type='hidden'>"
    $(div).html(innards);
    $('#new').append(div);
     planDate1()
  })
   
}

function planDate1(){
  console.log("dsadasdasdasas")
$('#search').click(function(event){
  console.log("dasdasd")
var date = $("input[name='date']")
var neighborhood = $("[name='neighborhood']").val()
$.ajax({
  url: '/events',
  type: 'GET',
  data: {zip: neighborhood},
  success: function(result){
    puttingResultsOn1(result)
    puttingGarbageCan1()
    puttingBoardOn1()
 
  }
})

})

}



function puttingGarbageCan1(){
    $('#trash').html("<img src='http://www.dirtyandthirty.com/wp-content/uploads/2011/10/garbage-can1.jpg' height='300' width='300'>")
}

function puttingBoardOn1(){
  $('#board').html("<div id='droppable' class='ui-widget-header'></div>")
     
//     $( "#droppable" ).droppable({
//   drop: function(event, ui) {
//      $(this).droppable('option', 'accept', ui.result);
//     alert( "dropped" );
//   }
// });
         
}

function puttingResultsOn1(results){
  $('#new').html('');
  for (var i = 0; i < results.length; i ++){
    $('#new').append("<li class='result'>"+results[i].hash.name+"</li>")
    $('.result').draggable({ revert: "invalid" })
   ;


  }

}








  })
