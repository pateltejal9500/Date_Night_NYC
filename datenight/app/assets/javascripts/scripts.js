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
  
  // Event listener reveals/hides 'Create New Account' form
  $('#create_account_link').on('click', function(event) {
  $('div.create_account').removeClass('noshow');
  });
}

 datesLoad1()
 makeNeighborhood1()
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
        $('div.profile').append("<li class='profile_list' id ="+plans[i].id+"><strong>Date:</strong> " + moment(plans[i].date).format('MMMM Do YYYY') + "<br>" + " <strong>Rating:</strong> "+ plans[i].rating+"<br><strong>Comment:</strong> "+plans[i].comment+"</li><hr>")
          $.ajax({
            url: "/plans/"+plans[i].id,
            type: 'GET',
            }).done(function(response){
            activities = response.activities
            for (var i= 0; i < activities.length; i ++){ 
                $('#'+response.id).append("<li class='profile_list'><strong>Activities: </strong><a href='"+activities[i].url+"' target='_blank'>"+activities[i].name + "</a></li>");
                
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
    var innards = "<div class='dropdown'><button class='btn btn-default dropdown-toggle style' type='button' id='dropdownMenu1' data-toggle='dropdown'>Your Saved Dates</button><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
      for (var i =0; i < user.plans.length; i ++){
        if (user.plans[i].done == false){
          console.log
          innards += "<li role='presentation'><a id=" + user.plans[i].id + " class ='contact' role='menuitem' tabindex='-1' href='#'>" + moment(user.plans[i].date).format('MMMM Do YYYY') + "</a></li>"
        }
      } 
       $("#date").html(innards) 

      if ($(".contact").length == 0){
        innards += "<li id='none'role='presentation'>No Dates Planned</li>"
      }

    innards += "<li role='presentation' class='divider'></li><li role='presentation'><a class='newDate'role='menuitem' tabindex='-1' href='#'>Plan a New Date</a></li></div>"

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

      $("#new").append("<div class='results'><ul><li><p class='name'><a class='url' href='"+plan.activities[i].url+"' target='_blank'><strong>"+plan.activities[i].name+"</strong></a></p><p class='rating'>Rating: "+plan.activities[i].rating+"</p></li></ul></div>") 
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
    makeNeighborhood1()
  })
}

//this makes ths neighboorhood scroll
function makeNeighborhood1(){
  $.get("/neighborhoods", function(neighborhood){
    var neighborhoods = _.sortBy(neighborhood, function(neighborhoodObject) {return neighborhoodObject.name})
    var innards = "<select name ='neighborhood' class='neighborhood'><option selected='selected'>Select a neighborhood</option>"
    var div = document.createElement('div');
    $(div).attr('id', 'option');
    for (var i = 0; i < neighborhoods.length; i ++){
      innards += "<option value="+ neighborhoods[i].id+">" + neighborhoods[i].name + "</option>"
      }
    innards += "</select>"+"<button class='search'>Plan!</button> <input name='authenticity_token' value='form_authenticity_token()' type='hidden'>"
    $(div).html(innards);
    $('#new').append(div);
     planDate1()
  })   
}

//this gets all the information from the server with random dates and events
function planDate1(){
  $('.search').click(function(event){
   var neighborhood_id = $("[name='neighborhood']").val()
   if (neighborhood_id == "Select a neighborhood"){
    alert("You Have To Pick A Neighborhood")
   } else {
   $.ajax({
    url: '/events',
    type: 'GET',
    data: {neighborhood: neighborhood_id},
    success: function(result){
      puttingBoardOn1(neighborhood_id)
      puttingResultsOn1(result, neighborhood_id)
    }
   })
 }
  })
}

//this is putting the board to drag items on, it is also adding anything dragged here onto it and making it draggable if anyone wants to put it back to its old place
function puttingBoardOn1(neighborhood_id,date){
  if (date){
    $('#board').html("<h2>Make a Plan</h2><h3>Drag and Drop Your Selections Here</h3><div id='drop' class='notes'></div><h2>Choose a Date</h2><p class='calendar'><input type='date' name='date' value="+date+"></p><button id='save_continue'>Save and Continue</button>")
  } else {
    $('#board').html("<h2>Make a Date</h2><h3>Drag and Drop Your Selections Here</h3><div id='drop' class='notes'></div><h2>Choose a Date</h2><p class='calendar'><input type='date' name='date'></p><p><button id='save_continue'>Save and Continue</button></p>")
  }
  $('#board').droppable({
    // activeClass: "ui-state-default",
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
  $("#save_continue").click(function(event){
   if ($("input[name='date']").val() == ""){
      alert("Please Enter a Date")
    } else {
    var date = $("input[name='date']").val()
    var info = $(".results")
    if (info.length == 0){
      alert("You Have To Pick Something")
    } else {
    secondPage(neighborhood_id,date,info) 
  }
    }
  })
}

//making the second page with all the buttons, if a person presses a date from the date tab it also just comes here
function secondPage(neighborhood_id,date,info,id){
  $("#board").html("")
  $("#new").html("<div class='theDate'>Date: " + moment(date).format('MMMM Do YYYY') + "</div>")
  for (var i = 0; i < info.length; i++){
    $("#new").append("<div id='results' class='results'>"+info[i].innerHTML+"</div>")
   }
  $("#new").append("<button id='save'>Save</button><button id='edit'>Edit Date</button><button id='delete'>Delete</button>")
  $("#new").append("<div class='button_strip'><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#invite'>Send Invite</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#remind'>Remind Me</button><button class = 'btn btn-primary btn-sm' data-toggle='modal' data-target='#done'>Mark Done</button></div>")
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
    alert("Date Has Been Deleted!")
    datesLoad1()
    makeNeighborhood1()
    $("#new").html("")
    $("#board").html("")
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
    rating = $(".rating")[i].innerText.split(": ")[1]
    results.push( {hash: {name: name, mobile_url: url, rating:rating}})
   }
   puttingResultsOn1(results, neighborhood_id)
   puttingBoardOn1(neighborhood_id,date)
  })
}

//this is the modal for the done button
function done(id){
 $("#board").append("<div class='modal fade' id='done' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>Hope You Enjoyed Your Date!!</h4></div><div class='modal-body'><textarea id = 'text' rows='4' cols='50' placeholder='Comments'></textarea><input type='text' name='rating' placeholder='Rate Your Date 1 -10'></input></div><div class='modal-footer'><button type='button' class='btn btn-default closedone' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary done'>Mark As Done</button></div></div></div></div>")
  doneDate(id)
}

//when you click done, it will take the information and put it into database stating that the date has been completed and now will not show up under date but only history instead
function doneDate(id){

  $(".done").click(function(event){
     if (id){
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
  } else {
  alert("You Have to Save First")
}
  })

}

//this is going to save the information(plan and activity after plan is created with an id, if you already have this saved it will not create one
function savingInformation(neighborhood_id, date,id){
  $("#save").click(function(event){
    if(id){
       $("#new").html("")
       $("#board").html("")
      datesLoad1()
      makeNeighborhood1()
      alert("Date Has Been Saved!")

    } else {

   $.ajax({
     url: '/plans',
     type: 'POST',
     data: {neighborhood_id: neighborhood_id, date: date},
     success: function(result){
      alert("Date Has Been Saved!")
     var results = $(".results")
     for (var i = 0; i < results.length; i ++){
       name = $(".name")[i].innerText
       url = $(".url")[i].href
       rating = $(".rating")[i].innerText.split(": ")[1]
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
     makeNeighborhood1()
    }
  })
 }
 })

}

//this is adding the date and the information on the modals that require it
function informationstuff(date){
  var info = $(".results")

    var innards = "Date: " + moment(date).format('MMMM Do YYYY')
  for (var i = 0; i < info.length; i++){
    innards += "\nLink: " +info[i].children[0].children[0].children[0].children[0].href+"\nName: "+ info[i].children[0].children[0].children[0].innerText + "\n "+ info[i].children[0].children[0].children[1].innerText
   }
   $(".here").val(innards)
}

//this is the modal to invite someone to the event

function invite(){
  $("#board").append("<div class='modal fade' id='invite' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'><label>Email: </label><input type='email' name='email'></h4></div><div class='modal-body inviteBody'><textarea id = 'textinvite'class='here' rows='4' cols='50' placeholder='comments'></textarea></div><div class='modal-footer'><button type='button' class='btn btn-default inviteClose' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary invite'>Invite</button></div></div></div></div>") 
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
 $("#board").append("<div class='modal fade' id='remind' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'><div class='modal-dialog'><div class='modal-content'><div class='modal-header'><button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span><span class='sr-only'>Close</span></button><h4 class='modal-title' id='myModalLabel'>EMAIL ME</h4></div><div class='modal-body emailBody'><textarea id = 'textme' class='here' rows='4' cols='50' placeholder='comments'></textarea></div><div class='modal-footer'><button type='button' class='btn btn-default closeMe' data-dismiss='modal'>Close</button><button type='button' class='btn btn-primary email'>Email Me</button></div></div></div></div>")
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
  $('#new').html("<h2>Results</h2><h3>Select 1 Restaurant & 1 Event:</h3><button class='searchAgain'>Get New Results</button>");
  for (var i = 0; i < results.length; i ++){
    $('#new').append("<div class='result'><ul><li><p class='name'><a class='url' href='"+results[i].hash.mobile_url+"' target='_blank'><strong>"+results[i].hash.name+"</strong></a></p><p class='rating'>Rating: "+results[i].hash.rating+"</p></li></ul></div>")  
  }
  $('.result').draggable({ cursor: "move", revert: "invalid" })
  $('#new').droppable({
    // activeClass: "ui-state-default",
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
