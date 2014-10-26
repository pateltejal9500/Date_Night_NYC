$(function(){
 datesLoad1()

function datesLoad1(){
  $.get("/plans", function(user){
    var innards = "<div class='dropdown'><button class='btn btn-default dropdown-toggle style' type='button' id='dropdownMenu1' data-toggle='dropdown'>DATES</button><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
    if (user.plans.length != 0){
      for (var i =0; i < user.plans.length; i ++){
        if (user.plans[i].done == false){
       
        innards += "<li role='presentation'><a id=" + user.plans[i].id + " class ='contact' role='menuitem' tabindex='-1' href='#'>" + user.plans[i].date+ "</a></li>"
       
    }
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
    var neighborhoods = _.sortBy(neighborhood, function(neighborhoodObject) {return neighborhoodObject.name})
    var innards = "<select name ='neighborhood' class='neighborhood'>"
    var div = document.createElement('div');
    $(div).attr('id', 'option');
    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].id+">" + neighborhoods[i].name + "</option>"
      }
    innards += "</select>"+"<button class='search'>ENTER</button> <input name='authenticity_token' value='form_authenticity_token()' type='hidden'>"
    $(div).html(innards);
    $('#new').append(div);
     planDate1()
  })
   
}

function planDate1(){
  console.log("dsadasdasdasas")
$('.search').click(function(event){
  console.log("dasdasd")
var date = $("input[name='date']").val()
console.log(date)
var neighborhood_id = $("[name='neighborhood']").val()



$.ajax({
  url: '/events',
  type: 'GET',
  data: {neighborhood: neighborhood_id},
  success: function(result){
    puttingBoardOn1(neighborhood_id)
    puttingResultsOn1(result, neighborhood_id)
 
 
  }
})

})

}





function puttingBoardOn1(neighborhood_id){

  $('#board').html("<div id='drop'><p>Drop here</p><button id='save'>SAVE</button></div>")
  $('#board').droppable({
      activeClass: "ui-state-default",
      drop: function(event,ui) {
        var target = $('#drop')
         var newOne = ui.draggable[0].innerText
        $("#drop").append("<li class='result'>"+newOne+"</li>")
        $('.result').draggable({ cursor: "move", revert: "invalid" })
        ui.draggable.remove()
      
    }

  })

  $("#save").click(function(event){
  var info = $("#drop")[0].children
  console.log(info)
 
  })

         
}





function puttingResultsOn1(results, neighborhood_id){
  $('#new').html("<h4>RESULTS</h4><br><button class='searchAgain'>MORE</button>");
  for (var i = 0; i < results.length; i ++){
    $('#new').append("<li class='result'>"+results[i].hash.name+"</li>")  
    
}
$('.result').draggable({ cursor: "move", revert: "invalid" })
 $('#new').droppable({
    activeClass: "ui-state-default",
      drop: function(event,ui) {
         var newOne = ui.draggable[0].innerText
         $("#new").append("<li class='result'>"+newOne+"</li>")
        $('.result').draggable({ cursor: "move", revert: "invalid" })
        ui.draggable.remove()
    }
  })

searchAgain(neighborhood_id)



}


function searchAgain(neighborhood_id){
  $('.searchAgain').click(function(event){

  $.ajax({
  url: '/events',
  type: 'GET',
  data: {neighborhood: neighborhood_id},
  success: function(result){
    puttingResultsOn1(result, neighborhood_id)
  
}
})

})
}



  })
