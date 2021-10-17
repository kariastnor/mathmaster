// First create variables to store the correct answer and the player's answer.
// Also create a variable for the mathematical operation. This will be used to track what operation is being used,
// and so that we can also trigger the last operation function automatically on a correct answer.
var answer = 0;
var yourAnswer = 0;
var operation = "";

// Trigger the calculator function when an operator button is clicked.
// Get the first letter from the button text and make it lower case, so that we can later use one switch statement for both
// clicks and keyboard shortcuts.
$(".operator-btn").click(function () {
  operation = $(this).text().toLowerCase().slice(0, 1);
  calculator(operation);
});

// Trigger calculator function when a, s, m or d keys are pressed.
$(document).keydown(function (event) {
  if (
    event.key === "a" ||
    event.key === "s" ||
    event.key === "m" ||
    event.key === "d"
  ) {
    operation = event.key;
    calculator(operation);
  }
});

// This calculator function triggers a different function depending on what operator the player has used.
// First also run the clearAnswer function, so that the previous answer is cleared (if any).
function calculator(operation) {
  clearAnswer();
  switch (operation) {
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
      console.log(operation);
      break;
  }
}

// Function for add operation. Generate two random numbers between 1 and 200.
// Remove the "hidden" class from h2 heading to show the calculation.
function add() {
  var randomNumberA1 = Math.ceil(Math.random() * 200);
  var randomNumberA2 = Math.ceil(Math.random() * 200);
  answer = randomNumberA1 + randomNumberA2;
  $("h2")
    .text(randomNumberA1 + " + " + randomNumberA2 + " =")
    .removeClass("hidden");
}

// Function for subtract operation. Generate two random numbers between 1 and 200,
// where the second number is always smaller, or the same, as the first number.
// Remove the "hidden" class from h2 heading to show the calculation.
function subtract() {
  var randomNumberS1 = Math.ceil(Math.random() * 200);
  var randomNumberS2 = Math.ceil(Math.random() * randomNumberS1);
  answer = randomNumberS1 - randomNumberS2;
  $("h2")
    .text(randomNumberS1 + " - " + randomNumberS2 + " =")
    .removeClass("hidden");
}

// Function for multiply operation. Generate two random numbers between 1 and 12.
// Remove the "hidden" class from h2 heading to show the calculation.
function multiply() {
  var randomNumberM1 = Math.ceil(Math.random() * 12);
  var randomNumberM2 = Math.ceil(Math.random() * 12);
  answer = randomNumberM1 * randomNumberM2;
  $("h2")
    .text(randomNumberM1 + " * " + randomNumberM2 + " =")
    .removeClass("hidden");
}

// Function for divide operation. Generate two random numbers between 1 and 12, then multiply them.
// Use the result as the first number in the calculation. This ensures that the number divides into a whole number.
// Remove the "hidden" class from h2 heading to show the calculation.
function divide() {
  var randomNumberD1 = Math.ceil(Math.random() * 12);
  var randomNumberD2 = Math.ceil(Math.random() * 12);
  var result = randomNumberD1 * randomNumberD2;
  answer = result / randomNumberD1;
  $("h2")
    .text(result + " / " + randomNumberD1 + " =")
    .removeClass("hidden");
}

// When the "Check answer" button is clicked, store the player's answer in the yourAnswer variable and
// trigger the checkAnswer function.
$(".answer-btn").on("click", function () {
  yourAnswer = parseInt($("#answer").val());
  checkAnswer();
});

// When the Enter key is pressed, store the player's answer in the yourAnswer variable and
// trigger the checkAnswer function.
$(document).keydown(function (event) {
  if (event.key === "Enter") {
    yourAnswer = parseInt($("#answer").val());
    checkAnswer();
  }
});

// Create three different messages to be shown for a correct and an incorrect answer.
var correctAnswers = [
  "Well done, your answer is correct!",
  "Yay! You are correct.",
  "Fantastic! That is correct.",
];
var incorrectAnswers = [
  "Not quite, try again",
  "Sorry, that is incorrect",
  "Incorrect answer, try again",
];

// Create a variable for keeping track of the player's score.
var score = 0;

// If the player's answer matches the correct answer, then show one of the three messages for correct answers, chosen randomly.
// Add 10 to the score variable and show the score in the second h4 heading.
// Finally, run the calculator function again after a 1.5 second delay, using the latest stored value in the operation variable.
// If the player's answer doesn't match the correct answer, then show one of the three messages for incorrect answers, chosen randomly.
// Remove 5 points from the score variable and show the score in the second h4 heading.
// When the answer is incorrect, the calculator function is NOT triggered again.
function checkAnswer() {
  if (answer === yourAnswer) {
    var randomNumberCorrect = Math.floor(Math.random() * 3);
    $("h4.check")
      .text(correctAnswers[randomNumberCorrect])
      .removeClass("hidden");
    score = score + 10;
    $("h4.score")
      .text("+10 points. Your score is now " + score + ".")
      .removeClass("hidden");
    setTimeout(function () {
      calculator(operation);
    }, 1500);
  } else {
    var randomNumberIncorrect = Math.floor(Math.random() * 3);
    $("h4.check")
      .text(incorrectAnswers[randomNumberIncorrect])
      .removeClass("hidden");
    score = score - 5;
    $("h4.score")
      .text("-5 points. Your score is now " + score + ".")
      .removeClass("hidden");
  }
}

// If the first h4 heading does NOT have the "hidden" class, i.e. if it's visible, then add the "hidden" class to hide it again.
// This is done whenever the calculator function is run to clear out the check answer message from the previous calculation.
// Also clear the value entered into the input field by the player.
function clearAnswer() {
  if ($("h4.check").hasClass("hidden") === false) {
    $("h4.check").addClass("hidden");
    $("#answer").val("");
  }
}
