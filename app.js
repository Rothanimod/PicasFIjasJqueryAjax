var picas = 0;
var fijas = 0;
//reset game on win
$('#winretry').click(function() {
  location.reload();
});
//game start!
$('#usernumber').bind("gameStart",function(e){
  e.preventDefault();
  console.log('game is running');
  var game_number = generateNumber();
  var user_number = $('#usernumber').val().split("").map(function(t){return parseInt(t)});
  storeNumber(game_number);
  if (validateNumber(user_number)){
    compareNumbers(user_number, game_number);
    displayResults();
    if (fijas == 4){
      wonGame();
    }else {
      resetTry();
    }

  }else {
    //TODO: handle input is not valid
    console.log('invalid input');
  }
});
//keyup event for enter
$('#usernumber').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("gameStart");
    }
});

//boolean return - validates if the user input has the appropiate format: 4 digits no repeats
function validateNumber(usern) {
  if (usern.length != 4 || usern.some(isNaN) || hasDuplicates(usern)){
    //activate span for length check
    console.log('invalid from validatenumber');
    $('#errors').addClass('error');
    $('#usernumber').addClass('error');
    return false;
  }  else {
    $('#errors').removeClass('error');
    $('#usernumber').removeClass('error');
    return true;
  }




}
//stores the game number on #game hidden field.
function storeNumber(numbertostore){
  value = numbertostore.join("");
  console.log('The number to guess is: ' + value);
  $('#game').val(value);
}

//generates a 4-digit number w/o repeated digits
//if theres a number already generated it just returns the number
function generateNumber() {
  if (!$('#game').val().length) {
    var gamenumber = [];
    while (gamenumber.length < 4) {
      var digit = random();
      if (!isInArray(digit, gamenumber)) {
        gamenumber.push(digit);
      }
    }
    return gamenumber;
  } else {
    return $('#game').val().split("").map(function(t){return parseInt(t)});
  }
}

// compares two 4-digit numbers: user_number and game_number
//also gets the number of 'fijas' and 'picas'
function compareNumbers(user, game){
  var i = 0;
  while (i < game.length) {
    if (user[i] == game[i]){
      fijas = fijas + 1;
    } else if (isInArray(user[i], game)){
      picas = picas +1;
    }
    i= i+1;
  }
}

function displayResults(){
  $('table > tbody:last-child').append('<tr><td>' + $('#usernumber').val() + '</td><td>'+ picas +'</td><td>' + fijas + '</td></tr>');
}

function resetTry() {
  picas =0;
  fijas =0;
  $('#usernumber').val('');
}
// destroys stored number and displays appropiate message for the user
function wonGame(){
  $('#win').modal('show');
}

// generates a random number between 0-9
function random(){
  return Math.floor(Math.random() * 10);
}
// checks if a value is contained in the array
function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
//checks if an array has duplicate elements
function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}
