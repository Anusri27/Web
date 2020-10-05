var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userChosenPattern = [];

var start = false;
var level = 0;
$(document).keydown(function() {
  if (!start) {
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userChosenPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userChosenPattern.length - 1);
})

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userChosenPattern[currentLevel]) {
    if (userChosenPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function nextSequence() {
  userChosenPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}




function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  start = false;
}
