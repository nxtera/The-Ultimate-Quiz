/*

GIVEN I am taking a code quiz
WHEN I click the start button
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and score


*/

/* Global Variables */
var startBTN = document.getElementById("startbtn");
var quizBox = document.getElementById("quiz-box");
var timeLeft = document.querySelector(".timer");
var timeLeftH2 = document.querySelector("#time-left");
var secondsLeft = 10;
var resultsBox = document.getElementById("end-page");
var initalBox = document.getElementById("init");
var mostRecentScore = localStorage.getItem("mostRecentScore");
var initials = document.getElementById("init");
var submitBTN = document.getElementById("btnsub");


// CREATE COUNDOWN TIMER
function coundown() {
    var timeInterval = setInterval(function () {
        if (secondsLeft > 0) {
            timeLeftH2.textContent = secondsLeft
            secondsLeft--
            // timeLeft.setAttribute("#time-left");
            // timeLeft.setAttribute(".timer");

        } else {
            clearInterval(timeInterval)
            showScores()

        }
    }, 1000)

}



/* Press start button to start the quiz */
startBTN.onclick = () => {
    console.log("it works");
    quizBox.classList.remove("hidden");
    startBTN.classList.add("hidden");
    timeLeft.classList.remove("hidden");
    coundown();
}


// CREATE A QUIZ CLASS
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    // WHAT QUESION ARE ARE WE ON
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    guess(answer) {
        if (this.getQuestionIndex().isCorrenctAnswer(answer)) {
            this.score++;
        } else {
            secondsLeft -= 5;
        }
        // move onto next question if answer is correct
        this.questionIndex++;
    }
    isEnded() {
        return this.questionIndex === this.questions.length;
    }

}



// CREATE A QUESTION CLASS
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    isCorrenctAnswer(choice) {
        return this.answer === choice;
    }
}

//DISPLAY QUESTION FUNCTION
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
        localStorage.setItem("mostRecentScore", `${quiz.score}`);
    } else {
        //show next question
        var questionElement = document.getElementById("qs");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show choices
        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
};

// GUESS FUNCTION
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        displayQuestion();
    }
}

// SHOW QUIZZ PROGRESS
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1
    var progressElement = document.getElementById("status")
    progressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

// SHOW SCORE
function showScores() {
    quizBox.classList.add("hidden");
    startBTN.classList.add("hidden");
    timeLeft.classList.add("hidden");
    resultsBox.classList.remove("hidden");
    document.getElementById("final-score").textContent += `${quiz.score}`;

}


// CREATE QUIZ QUESTIONS
var questions = [
    new Question(
        "HTML is a...",
        ["Programming Language", "Database software", "Markup Language with Tags", "Operating system"],
        "Markup Language with Tags"
    ),
    new Question(
        "What is the file extension used for HTML files?",
        [".htm or .html", ".ppt", ".exe", ".jpg"],
        ".htm or .html"
    ),
    new Question(
        "The main containt of the page are kept inside...",
        ["Inside Head section of the page", "After closing html tag of the page", "Inside body section of the page",
            "Before the Head section of the page"],
        "Inside body section of the page"
    ),
    new Question(
        "How many types of Headings does HTML use?",
        ["6", "8", "5", "10"], "6"
    )
];

// Start Quiz
var quiz = new Quiz(questions);



//SAVE SCORE
initials.addEventListener("keyup", ()  => {
console.log(initials.value);
});
saveHighScore = e => {
console.log("Cliked Save");
e.preventDefault();
var score = {
score: mostRecentScore,
name: initials.value
};

}

// DISPLAY QUESTION
displayQuestion();



