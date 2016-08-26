//background-color change fadeIn
$('#change_button').click(function(){
  $('.back-change').fadeOut();
  $('.settings').fadeOut();
  $('.back-color').fadeIn();
});




//background-color change
$('#blue').click(function(){
  $('body').css("background-color","#59b9c6");
  $('.profile').css("background-color","#007bbb");
});
$('#orange').click(function(){
  $('body').css("background-color","orange");
  $('.profile').css("background-color","#f6ad49");
});
$('#red').click(function(){
  $('body').css("background-color","#F26964");
  $('.profile').css("background-color","#e60033");
});
$('#green').click(function(){
  $('body').css("background-color","#006e54");
  $('.profile').css("background-color","#00a381");
});
$('#yellow').click(function(){
  $('body').css("background-color","#ffec47");
  $('.profile').css("background-color","#fef263");
});
$('#close').click(function(){
  $('.back-color').fadeOut();
  $('.back-change').fadeIn();
  $('.settings').fadeIn();
})
