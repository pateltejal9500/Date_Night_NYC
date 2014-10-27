$(function(){


  function splash(){
    
var splashpage = $('#splashpage');

// var backgrounds = new Array(
//     'url(./images/manhattan_skyline.jpg)'
//   , 'url(./images/brooklyn_bridge.jpg)'
// );

var backgrounds = ['url(./images/times_square.jpg)', 'url(./images/manhattan_skyline.jpg)', 'url(./images/lincoln_center.jpg)', 'url(./images/queensboro_bridge.jpg)', 'url(./images/nyc_lights.jpg)', 'url(./images/brooklyn_bridge.jpg)', 'url(./images/central_park.jpg)', 'url(./images/new_york_lights.jpg)'];


var current = 0;

function nextBackground() {
    current++;
    current = current % backgrounds.length;
    splashpage.css('background-image', backgrounds[current]);
}
setInterval(nextBackground, 5000);

splashpage.css('background-image', backgrounds[0]);
});
}

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
    $("#new").html("")
    $("#board").html("")
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
$('.search').click(function(event){
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

  $('#board').html("<h2>DATE INFO</h2><input type='date' name='date'><div id='drop'><p>Drop here</p><button id='save'>SAVE AND CONTINUE</button></div>")
  $('#board').droppable({
      activeClass: "ui-state-default",
      drop: function(event,ui) {
         var newOne = ui.draggable[0].innerHTML
        $("#drop").append("<div class='result'>"+newOne+"</div>")
        $('.result').draggable({ cursor: "move", revert: "invalid" })
        ui.draggable.remove()
      
    }

  })

  secondPage(neighborhood_id)



         
}

function secondPage(neighborhood_id){
  $("#save").click(function(event){
  var date = $("input[name='date']").val()
  if (date != ""){
     $("#new").html("<div class='theDate'>DATE: " + date + "</div>")

  } else {
     $("#new").html("")

  }
  var info = $(".result")

  
   for (var i = 0; i < info.length; i++){
    $("#new").append("<div class='result'>"+info[i].innerHTML+"</div>")
   }

   $("#new").append("<button id='save'>SAVE</button><button id='edit'>EDIT DATE</button><button id='delete'>DELETE</button>")
    $("#board").html("<button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#invite'>INVITE</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#remind'>EMAIL ME</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#comment'>COMMENT</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#done'>Done</button>")
    done()
    invite()
    remind()
    comment()
    information()
     savingInformation(neighborhood_id,date)
   

 
  })

}

function done(){
 $("#board").append("<div class='modal fade' id='done' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>Hope You Enjoyed Your Date!!</h4></div><div class='modal-body'><textarea rows='4' cols='50' placeholder='comments'></textarea><input type='text' name='rating' placeholder='rating 1 -10'></input></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary done'>DONE</button></div></div></div></div>")



}

function savingInformation(neighborhood_id, date){
  $("#save").click(function(event){

  $.ajax({
  url: '/activities',
  type: 'POST',
  data: {neighborhood_id: neighborhood_id, date: date},
  success: function(result){
console.log(result)   
 
 
  }
})

})
    // console.log($(".result").length)


}

function information(){
    var info = $(".result")
    if ($(".theDate")[0]){
    $(".here").append($(".theDate")[0].innerText)
  }
      for (var i = 0; i < info.length; i++){
    $(".here").append("<br>"+info[i].innerHTML)
   }


}

function invite(){
  
    $("#board").append("<div class='modal fade' id='invite' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'><label>Email: </label><input type='email' name='email'></h4></div><div class='modal-body here'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary invite'>INVITE</button></div></div></div></div>")
 


  
}

function remind(){
   $("#board").append("<div class='modal fade' id='remind' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>EMAIL ME</h4></div><div class='modal-body here'></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary email'>EMAIL ME</button></div></div></div></div>")
  
}

function comment(){
  $("#board").append("<div class='modal fade' id='comment' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>COMMENT</h4></div><div class='modal-body'><textarea rows='4' cols='50'></textarea></div><div class='modal-footer'><button type='button' class='btn btn-default' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary save'>Save changes</button></div></div></div></div>")
}


function puttingResultsOn1(results, neighborhood_id){
  $('#new').html("<h4>RESULTS</h4><button class='searchAgain'>MORE</button>");
  for (var i = 0; i < results.length; i ++){
    $('#new').append("<div class='result'><strong>"+results[i].hash.name+"</strong><p>Rating: "+results[i].hash.rating+"</p><a href='"+results[i].hash.mobile_url+"' target='_blank'>MORE INFO</a></div>")  
    
}
$('.result').draggable({ cursor: "move", revert: "invalid" })
 $('#new').droppable({
    activeClass: "ui-state-default",
      drop: function(event,ui) {

         var newOne = ui.draggable[0].innerHTML
         $("#new").append("<div class='result'>"+newOne+"</div>")
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
