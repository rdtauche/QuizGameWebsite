// ******Identifying HTML elements for manipulation*********
var startGameEl = document.querySelector("#start-game");
var questions = document.querySelector("#questions");
var intro = document.querySelector("#intro");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#timer");
// show final score
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGameBtns");
var submitScoreBtn = document.getElementById("submitScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var finalScoreEl = document.getElementById("finalScore");
var gameoverDiv = document.getElementById("gameover");
var startQuizDiv = document.getElementById("startagain");

var score = 0;
var timer = 150;
// var timeInterval = 60;
var timeLeft = 60;


// *******Quiz Questions Object*******
var question = [
  {
    question: "Which team won the Barclays Premier Soccer League in 2023?",
    choices: ["Liverpool", "Man City", "Arsenal", "Man United"],
    answer: "Man City",
  },
  {
    question: "Who was the top scorer in the Premier League in 2023?",
    choices: ["Erling Haaland", "Harry Kane", "Messi", "Ronaldo"],
    answer: "Erling Haaland",
  },
  {
    question: "Which is the only team to ever go undefeated in a season?",
    choices:  ["Liverpool", "Man United", "Man City", "Arsenal"],
    answer: "Arsenal",
  },
  {
    question: "Who is the current coach of Man City?",
    choices: ["Jose Mourinho", "Sir Alex Ferguson", "Pep Guardiola", "Arsene Wenger"],
    answer: "Pep Guardiola",
  },
];

var questionIndex = 0;

// *****Creates the countDown Timer************
function startTimer() {
  setInterval(function () {
    if (timer > 0) {
      timer--;
      timerEl.textContent = timer;
    } else {
      showScore();
    }
  }, 1000);
}

// ******Function:  hides the intro, shows the first question and starts the game***
function startGame() {
  intro.setAttribute("class", "hide");
  endGameBtns.setAttribute("class", "hide");
  highscoreDiv.setAttribute("class", "hide");
  gameoverDiv.setAttribute("class", "hide");
  updateQuestion();
  questions.setAttribute("class", "show");
  timerEl.setAttribute("class", "show");
  startTimer();
}

// ****Function: goes thru the questions in the game
function updateQuestion() {
  if (questionIndex === question.length) {
    setTimeout(showScore, 3000);
    return;
  }
  questionEl.textContent = question[questionIndex].question;
  choicesEl.innerHTML = "";
  resultEl.innerHTML = "";
  for (var i = 0; i < question[questionIndex].choices.length; i++) {
    var element = document.createElement("li");
    element.textContent = question[questionIndex].choices[i];
    choicesEl.appendChild(element);
  }
}

// ***Function:  this ends the game*************
function showScore() {
  questions.setAttribute("class", "hide");
  timerEl.setAttribute("class", "hide");
  resultEl.setAttribute("class", "hide");
  endGameBtns.setAttribute("class", "show");
  highscoreContainer.setAttribute("class", "show");
  highscoreDiv.setAttribute("class", "show");
  gameoverDiv.setAttribute("class", "show");
  clearInterval(timeInterval);
  highscoreInputName.value = "";
  finalScoreEl.innerHTML = "You got " + score + " out of " + question.length + " correct!";
}
// On click of the submit button, we run the function highscore that saves and stringifies the array of high scores already saved in local stoage
// as well as pushing the new user name and score into the array we are saving in local storage. Then it runs the function to show high scores.
submitScoreBtn.addEventListener("click", function highscore(){
    
    
  if(highscoreInputName.value === "") {
      alert("Initials cannot be blank");
      return false;
  }else{
      var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
      var currentUser = highscoreInputName.value.trim();
      var currentHighscore = {
          name : currentUser,
          score : score
      };
  
      gameoverDiv.style.display = "none";
      highscoreContainer.style.display = "flex";
      highscoreDiv.style.display = "block";
      endGameBtns.style.display = "flex";
      
      savedHighscores.push(currentHighscore);
      localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
      generateHighscores();

  }
  
});

// This function clears the list for the high scores and generates a new high score list from local storage
function generateHighscores(){
  highscoreDisplayName.innerHTML = "";
  highscoreDisplayScore.innerHTML = "";
  var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
  for (i=0; i<highscores.length; i++){
      var newNameSpan = document.createElement("li");
      var newScoreSpan = document.createElement("li");
      newNameSpan.textContent = highscores[i].name;
      newScoreSpan.textContent = highscores[i].score;
      highscoreDisplayName.appendChild(newNameSpan);
      highscoreDisplayScore.appendChild(newScoreSpan);
  }
}


// This function displays the high scores page while hiding all of the other pages from 
function showHighscore(){
  startQuizDiv.style.display = "none"
  gameoverDiv.style.display = "none";
  highscoreContainer.style.display = "flex";
  highscoreDiv.style.display = "block";
  endGameBtns.style.display = "flex";

  generateHighscores();
}

// This function clears the local storage of the high scores as well as clearing the text from the high score board
function clearScore(){
  window.localStorage.clear();
  highscoreDisplayName.textContent = "";
  highscoreDisplayScore.textContent = "";
}

// This function sets all the variables back to their original values and shows the home page to enable replay of the quiz
function replayQuiz(){
  highscoreContainer.style.display = "none";
  gameoverDiv.style.display = "none";
  startQuizDiv.style.display = "flex";
  timeLeft = 60;
  score = 0;
  currentQuestionIndex = 0;
}

// ***This checks if the answer selected is correct or incorrect
choicesEl.addEventListener("click", function (event) {
  var target = event.target;

  if (target.matches("li")) {
    if (target.textContent === question[questionIndex].answer) {
      resultEl.textContent = "correct";
    } else {
      resultEl.textContent = "incorrect";
      timer = timer - 5;
    }

    questionIndex++;

    setTimeout(updateQuestion, 1500);
  }
});


// ****************This starts the game******************
startGameEl.addEventListener("click", startGame);