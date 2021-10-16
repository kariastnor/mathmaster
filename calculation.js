var answer = 0;
var yourAnswer = 0;

$(".operator-btn").click(function () {
  clearCheckAnswer();
  var operation = $(this).text();
  switch (operation) {
    case "Add":
      add();
      break;
    case "Subtract":
      subtract();
      break;
    case "Multiply":
      multiply();
      break;
    case "Divide":
      divide();
      break;
    default:
      console.log(operation);
      break;
  }
});

$(document).keydown(function (event) {
  clearCheckAnswer();
  switch (event.key) {
    case "a":
      add();
      break;
    case "s":
      subtract();
      break;
    case "m":
      multiply();
      break;
    case "d":
      divide();
      break;
    default:
      console.log(event.key);
      break;
  }
});

function add() {
  var randomNumberA1 = Math.ceil(Math.random() * 200);
  var randomNumberA2 = Math.ceil(Math.random() * 200);
  answer = randomNumberA1 + randomNumberA2;
  $("h2").text(randomNumberA1 + " + " + randomNumberA2 + " =").removeClass("hidden");
}

function subtract() {
  var randomNumberS1 = Math.ceil(Math.random() * 200);
  var randomNumberS2 = Math.ceil(Math.random() * randomNumberS1);
  answer = randomNumberS1 - randomNumberS2;
  $("h2").text(randomNumberS1 + " - " + randomNumberS2 + " =").removeClass("hidden");
}

function multiply() {
  var randomNumberM1 = Math.ceil(Math.random() * 12);
  var randomNumberM2 = Math.ceil(Math.random() * 12);
  answer = randomNumberM1 * randomNumberM2;
  $("h2").text(randomNumberM1 + " * " + randomNumberM2 + " =").removeClass("hidden");
}

function divide() {
  var randomNumberD1 = Math.ceil(Math.random() * 12);
  var randomNumberD2 = Math.ceil(Math.random() * 12);
  var result = randomNumberD1 * randomNumberD2;
  answer = result / randomNumberD1;
  $("h2").text(result + " / " + randomNumberD1 + " =").removeClass("hidden");
}

$(".answer-btn").on("click", function () {
  yourAnswer = parseInt($("#answer").val());
  checkAnswer();
});

$(document).keydown(function (event) {
  if (event.key === "Enter") {
    yourAnswer = parseInt($("#answer").val());
    checkAnswer();
  }
});

function checkAnswer() {
  if (answer === yourAnswer) {
    $("h4").text("Well done, your answer is correct!");
    $("h4").removeClass("hidden");
  } else {
    $("h4").text("Not quite, try again");
    $("h4").removeClass("hidden");
  }
}

function clearCheckAnswer() {
  if ($("h4").hasClass("hidden") === false) {
    $("h4").addClass("hidden");
    $("#answer").val("");
  }
}