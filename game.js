var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var started = false;

var level = 0;

//Key Press to Start

$(document).on('keypress touchstart',function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

//button click
$(".btn").click(function () {
  var userChoosenColour = this.id;
  userClickedPattern.push(userChoosenColour);

  animatePress(userChoosenColour);
  playSound(userChoosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Sequence add

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

//play Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//check the answer

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrongAudio = new Audio("sounds/wrong.mp3");
    wrongAudio.play();

    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Keyboard Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
