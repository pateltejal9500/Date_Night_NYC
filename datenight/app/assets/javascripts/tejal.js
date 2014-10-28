$(function(){
  splash()

  //getting the splash page where a user can sign in or create a profile
function splash(){
  var splashpage = $('#splashpage');
  var backgrounds = ['url(./images/times_square.jpg)', 'url(./images/manhattan_skyline.jpg)', 'url(./images/lincoln_center.jpg)', 'url(./images/queensboro_bridge.jpg)', 'url(./images/nyc_lights.jpg)', 'url(./images/brooklyn_bridge.jpg)', 'url(./images/central_park.jpg)', 'url(./images/new_york_lights.jpg)'];
  var current = 0;

  function nextBackground() {
    current++;
    current = current % backgrounds.length;
    splashpage.css('background-image', backgrounds[current]);
  }
  setInterval(nextBackground, 5000);

  splashpage.css('background-image', backgrounds[0]);
}

 datesLoad1()
 makeNeighboorhood1()
 userProfileListener()

 //profile button
function userProfileListener() {
$('.user_icon').on('click', function(e) {
  $(".profile").html("")
  $("#new").html("")
  $("#board").html("")
  e.preventDefault();
  var id = $(this).parent().attr("id");
    $.ajax({
     url:'/plans',
      type: 'GET'
      }).done(function(response){
      var plans = response["plans"];
      $('div.profile').append("<h2>Welcome, "  + response["fname"] + "!</h2>" + "<h3>Your History of Plans:</h3>"); 
      for (var i = 0; i < plans.length; i++) {
        if (plans[i].done == true){
        $('div.profile').append("<li> Date: " +plans[i].date + "<br>" + " Rating: "+ plans[i].rating+" Comment: "+plans[i].comment+"</li>")
          $.ajax({
            url: "/plans/"+plans[i].id,
            type: 'GET',
            }).done(function(response){
            activities = response.activities
            for (var i= 0; i < activities.length; i ++){ 
                $('div.profile').append("<li>Activities: " + activities[i].name + "<br></li>");
                
            }
          })
          }
          } 
        })
    
    })
  }

//loading the date tab where you can add a new date or see all the previous ones
function datesLoad1(){
  $.get("/plans", function(user){
    var innards = "<div class='dropdown'><button class='btn btn-default dropdown-toggle style' type='button' id='dropdownMenu1' data-toggle='dropdown'>DATES</button><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
      for (var i =0; i < user.plans.length; i ++){
        if (user.plans[i].done == false){
          innards += "<li role='presentation'><a id=" + user.plans[i].id + " class ='contact' role='menuitem' tabindex='-1' href='#'>" + user.plans[i].date+ "</a></li>"
        }
      } 
    innards += "<li role='presentation' class='divider'></li><li role='presentation'><a class='newDate'role='menuitem' tabindex='-1' href='#'>NEW DATE</a></li></div>"

    $("#date").html(innards)  
     newDate1()
    for (var i = 0; i < user.plans.length; i ++){
       informationForOne(user.plans[i].id)
      }  
  })

}

//this is making all the dates under date clickable letting you view them on the second page
function informationForOne(id){
  $("#"+id).click(function(event){
    $("#new").html("")
    $(".profile").html("")
    $.get("/plans/"+id, function(plan){
      for (var i = 0; i < plan.activities.length; i++){
      $("#new").append("<div class='results'><p class='name'><strong>"+plan.activities[i].name+"</strong></p>Rating:<p class='rating'>"+plan.activities[i].rating+"</p><a class='url' href='"+plan.activities[i].url+"' target='_blank'>MORE INFO</a></div>") 
      }
      info = $(".results")
      secondPage(plan.neighborhood_id,plan.date,info,id)  
    })

  })
}


//when you make a new date it clears all the date on the DOM
function newDate1(){
  $(".newDate").click(function(event){
    $(".profile").html("")
    $("#new").html("")
    $("#board").html("")
    makeNeighboorhood1()
  })
}

//this makes ths neighboorhood scroll
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

//this gets all the information from the server with random dates and events
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

//this is putting the board to drag items on, it is also adding anything dragged here onto it and making it draggable if anyone wants to put it back to its old place
function puttingBoardOn1(neighborhood_id,date){
  if (date){
    $('#board').html("<h2>DATE INFO</h2><input type='date' name='date' value="+date+"><div id='drop'><p>Drop here</p><button id='save'>SAVE AND CONTINUE</button></div>")
  } else {
    $('#board').html("<h2>DATE INFO</h2><input type='date' name='date'><div id='drop'><p>Drop here</p><button id='save'>SAVE AND CONTINUE</button></div>")
  }
  $('#board').droppable({
    activeClass: "ui-state-default",
    drop: function(event,ui) {
      var newOne = ui.draggable[0].innerHTML
      $("#drop").append("<div class='results'>"+newOne+"</div>")
      $('.results').draggable({ cursor: "move", revert: "invalid" })
      ui.draggable.remove()
    }

  })
  gettingInfo(neighborhood_id)         
}

//once you press save, it is making sure that you have a date and if you do, it will display everything on the second page
function gettingInfo(neighborhood_id){
  $("#save").click(function(event){
   if ($("input[name='date']").val() == ""){
      alert("YOU HAVE TO ENTER A DATE")
    } else {
    var date = $("input[name='date']").val()
    var info = $(".results")
    secondPage(neighborhood_id,date,info) 
    }
  })
}

//making the second page with all the buttons, if a person presses a date from the date tab it also just comes here
function secondPage(neighborhood_id,date,info,id){
  $("#new").html("<div class='theDate'>DATE: " + date + "</div>")
  for (var i = 0; i < info.length; i++){
    $("#new").append("<div class='results'>"+info[i].innerHTML+"</div>")
   }
  $("#new").append("<button id='save'>SAVE</button><button id='edit'>EDIT DATE</button><button id='delete'>DELETE</button>")
  $("#board").html("<button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#invite'>INVITE</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#remind'>EMAIL ME</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#done'>Done</button>")
  done(id)
  invite()
  remind(date)
  informationstuff(date)
  savingInformation(neighborhood_id,date,id)
  editInformation(neighborhood_id,date,id)
  deletingButton(id)
}

//when you press delete button
function deletingButton(id){
  $("#delete").click(function(event){
    deleting(id)
    datesLoad1()
    makeNeighboorhood1()
    $("#new").html("")
  })
}

//deleting information from the database
function deleting(id){
  if (id){
    $.ajax({
      url: "/plans/"+id,
      type: "DELETE",
      success: function(result){
      }
    })
  }
}

//when you press edit, it will delete the information and regenerate it on the first page for you to edit
//it deletes it when you save it, it will add it to the database again
function editInformation(neighborhood_id,date,id){
  info = $(".results")
  $("#edit").click(function(event){
   deleting(id)
   results =[]
   for( var i = 0; i < info.length; i ++){
    name = $(".name")[i].innerText
    url = $(".url")[i].href
    rating = $(".rating")[i].innerText
    results.push( {hash: {name: name, mobile_url: url, rating:rating}})
   }
   puttingResultsOn1(results, neighborhood_id)
   puttingBoardOn1(neighborhood_id,date)
  })
}

//this is the modal for the done button
function done(id){
 $("#board").append("<div class='modal fade' id='done' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>Hope You Enjoyed Your Date!!</h4></div><div class='modal-body'><textarea id = 'text' rows='4' cols='50' placeholder='comments'></textarea><input type='text' name='rating' placeholder='rating 1 -10'></input></div><div class='modal-footer'><button type='button' class='btn btn-default closedone' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary done'>DONE</button></div></div></div></div>")
  doneDate(id)
}

//when you click done, it will take the information and put it into database stating that the date has been completed and now will not show up under date but only history instead
function doneDate(id){
  $(".done").click(function(event){
    rating = $("input[name='rating']").val()
    text = $("#text").val()
    $.ajax({
      url: "/plans/"+id,
      type: "PUT",
      data: {done: true, rating: rating, comment: text},
      success: function(result){
        $(".closedone").click()
       }
    })
       window.location.reload()
  })
}

//this is going to save the information(plan and activity after plan is created with an id, if you already have this saved it will not create one
function savingInformation(neighborhood_id, date,id){
  $("#save").click(function(event){
    if(id){
       $("#new").html("")
          $("#board").html("")
    datesLoad1()
     makeNeighboorhood1()

    } else {

   $.ajax({
     url: '/plans',
     type: 'POST',
     data: {neighborhood_id: neighborhood_id, date: date},
     success: function(result){
     var results = $(".results")
     for (var i = 0; i < results.length; i ++){
       name = $(".name")[i].innerText
       url = $(".url")[i].href
       rating = $(".rating")[i].innerText
       $.ajax({
         url: "/activities",
         type: 'POST',
         data: {plan_id: result.id, name: name, url: url, rating:rating},
         success: function(result){
          $("#new").html("")
          $("#board").html("")
         }
       })
     }
     datesLoad1()
     makeNeighboorhood1()
    }
  })
 }
 })

}

//this is adding the date and the information on the modals that require it
function informationstuff(date){
  var info = $(".results")

    var innards = "DATE: " + date
  
  for (var i = 0; i < info.length; i++){
    innards += " \nName: "+ info[i].children[0].innerText+ " \nRating: " + info[i].children[1].innerText+" \nLink: " +info[0].children[2].href
   }
   $(".here").val(innards)
}

//this is the modal to invite someone to the event

function invite(){
  $("#board").append("<div class='modal fade' id='invite' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'><label>Email: </label><input type='email' name='email'></h4></div><div class='modal-body inviteBody'><textarea id = 'textinvite'class='here' rows='4' cols='50' placeholder='comments'></textarea></div><div class='modal-footer'><button type='button' class='btn btn-default inviteClose' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary invite'>INVITE</button></div></div></div></div>") 
  inviteSomeone()
}

//this is going to the served with the information that wants to be sent in the email
function inviteSomeone(){
 $(".invite").click(function(event){
  var email = $("input[name='email']").val()
  var innards = $("#textinvite").val()


  $.ajax({
    url: "/messages",
    type: "GET",
    data: {email: email, information: innards},
    success: function(result){
      $("input[name='email']").val("")
      $(".inviteClose").click()
    }
  })
 })
}

//this is the modal if you want to remind yourself about the date
function remind(date){
 $("#board").append("<div class='modal fade' id='remind' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>EMAIL ME</h4></div><div class='modal-body emailBody'><textarea id = 'textme' class='here' rows='4' cols='50' placeholder='comments'></textarea></div><div class='modal-footer'><button type='button' class='btn btn-default closeMe' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary email'>EMAIL ME</button></div></div></div></div>")
   remindMe(date)
}


//this will send the info to the server for the email reminding you
function remindMe(date){
  $(".email").click(function(event){
  var innards = $("#textme").val()
  $.ajax({
    url: "/messages",
    type: "GET",
    data: {information: innards},
    success: function(result){
    
      $(".closeMe").click()
    }
  })
  })
}

//this is the code that puts the results on the page after getting it from the yelp api and our events api
//making the information draggable and droppable
function puttingResultsOn1(results, neighborhood_id){
  $('#new').html("<h4>RESULTS</h4><button class='searchAgain'>MORE</button>");
  for (var i = 0; i < results.length; i ++){
    $('#new').append("<div class='result'><p class='name'><strong>"+results[i].hash.name+"</strong></p>Rating:<p class='rating'>"+results[i].hash.rating+"</p><a class='url' href='"+results[i].hash.mobile_url+"' target='_blank'>MORE INFO</a></div>")  
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

//if you want to search for more results and you press the button-this will get you more results
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
