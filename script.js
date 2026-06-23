// Quiz Questions

const quiz = [

{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyperlinks Text Markup Language",
"Hyper Tool Markup Language"
],
answer:"Hyper Text Markup Language"
},

{
question:"Which language is used for styling web pages?",
options:[
"HTML",
"CSS",
"Java",
"Python"
],
answer:"CSS"
},

{
question:"Which language is used for interactivity on web pages?",
options:[
"C",
"Java",
"JavaScript",
"PHP"
],
answer:"JavaScript"
},

{
question:"Which company developed JavaScript?",
options:[
"Google",
"Netscape",
"Microsoft",
"Apple"
],
answer:"Netscape"
},

{
question:"Which HTML tag creates a hyperlink?",
options:[
"<a>",
"<link>",
"<url>",
"<href>"
],
answer:"<a>"
}

];

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let playerName = "";

// Start Quiz

document.getElementById("startBtn")
.addEventListener("click", function(){

playerName =
document.getElementById("playerName").value;

if(playerName.trim() === ""){
alert("Please enter your name");
return;
}

document.getElementById("startScreen").style.display="none";
document.getElementById("quizScreen").style.display="block";

loadQuestion();

});

// Load Question

function loadQuestion(){

const q = quiz[currentQuestion];

document.getElementById("question").innerText =
q.question;

const optionsDiv =
document.getElementById("options");

optionsDiv.innerHTML = "";

q.options.forEach(option => {

const btn =
document.createElement("button");

btn.classList.add("option");

btn.innerText = option;

btn.addEventListener("click", function(){

selectedAnswer = option;

document
.querySelectorAll(".option")
.forEach(btn =>
btn.classList.remove("selected"));

this.classList.add("selected");

});

optionsDiv.appendChild(btn);

});

}

// Next Question

document.getElementById("nextBtn")
.addEventListener("click", function(){

if(selectedAnswer === ""){
alert("Please select an answer");
return;
}

if(
selectedAnswer ===
quiz[currentQuestion].answer
){
score++;
}

selectedAnswer = "";

currentQuestion++;

if(currentQuestion < quiz.length){
loadQuestion();
}
else{
showResult();
}

});

// Show Result

function showResult(){

document.getElementById("quizScreen").style.display="none";
document.getElementById("resultScreen").style.display="block";

document.getElementById("scoreText").innerHTML =
`${playerName}, Your Score: ${score}/${quiz.length}`;

saveLeaderboard();

displayLeaderboard();

}

// Save Score

function saveLeaderboard(){

let leaderboard =
JSON.parse(
localStorage.getItem("leaderboard")
) || [];

leaderboard.push({
name:playerName,
score:score
});

leaderboard.sort((a,b)=> b.score-a.score);

localStorage.setItem(
"leaderboard",
JSON.stringify(leaderboard)
);

}

// Display Leaderboard

function displayLeaderboard(){

let leaderboard =
JSON.parse(
localStorage.getItem("leaderboard")
) || [];

const board =
document.getElementById("leaderboard");

board.innerHTML = "";

leaderboard.forEach((player,index)=>{

board.innerHTML += `
<div class="player">
${index + 1}. ${player.name} - ${player.score} Points
</div>
`;

});

}
