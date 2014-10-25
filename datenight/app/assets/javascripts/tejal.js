$(function(){
 datesLoad1()


//when user logs in connect this to the user

function datesLoad1(){

  $.get("/homepage", function(user){
    console.log(user.plans.length)
     var innards = "<div class='dropdown'><button class='btn btn-default dropdown-toggle style' type='button' id='dropdownMenu1' data-toggle='dropdown'>DATES</button><ul class='dropdown-menu' role='menu' aria-labelledby='dropdownMenu1'>"
    if (user.plans.length != 0){
      for (var i =0; i < user.plans.length; i ++){
        console.log("hey")
        innards += "<li role='presentation'><a id=" + user.plans[i].id + " class ='contact' role='menuitem' tabindex='-1' href='#'>" + user.plans[i].date+ "</a></li>"
      } 
     } else {
      innards += "<li role='presentation'><a class ='contact' role='menuitem' tabindex='-1'> NO CURRENT DATES</a></li>"
     }

          innards += "<li role='presentation' class='divider'></li><li role='presentation'><a class='new'role='menuitem' tabindex='-1' href='#'>NEW DATE</a></li></div>"
      
         $("#date").html(innards) 
        
        
  })
}





})