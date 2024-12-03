const questions = [
    {
        question: "What is HTML?",
        answers: [
            {text: "HyperText Markup Language", correct: true},
            {text: "High-Tech Markup Library", correct: false},
            {text: "HyperTool Main Layout", correct: false},
            {text: "Hyperlink Text Module", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text: "Cascading Style Sheets", correct: true},
            {text: "Creative Style System", correct: false},
            {text: "Computer Style Syntax", correct: false},
            {text: "Central Styling Structure", correct: false},
        ]
    },
    {
        question: "What is JavaScript mainly used for?",
        answers: [
            {text: "Adding interactive behavior to web pages", correct: true},
            {text: "Creating backend databases", correct: false},
            {text: "Designing website layouts", correct: false},
            {text: "Managing server operations", correct: false},
        ]
    },
    {
        question: "What tag is used to create a hyperlink in HTML?",
        answers: [
            {text: "<a>", correct: true},
            {text: "<link>", correct: false},
            {text: "<href>", correct: false},
            {text: "<url>", correct: false},
        ]
    },
    {
        question: "Which HTML tag is used to define a table?",
        answers: [
            {text: "<table>", correct: true},
            {text: "<tab>", correct: false},
            {text: "<tbl>", correct: false},
            {text: "<grid>", correct: false},
        ]
    },
    {
        question: "Which of the following is NOT a JavaScript data type?",
        answers: [
            {text: "Float", correct: true},
            {text: "Number", correct: false},
            {text: "String", correct: false},
            {text: "Boolean", correct: false},
        ]
    },
    {
        question: "What is the correct way to write an array in JavaScript?",
        answers: [
            {text: "let myArray = [1, 2, 3];", correct: true},
            {text: "let myArray = {1, 2, 3};", correct: false},
            {text: "let myArray = (1, 2, 3);", correct: false},
            {text: "let myArray = <1, 2, 3>;", correct: false},
        ]
    },
    {
        question: "What does the <title> tag in HTML do?",
        answers: [
            {text: "Sets the title of the web page displayed in the browser's title bar or tab", correct: true},
            {text: "Adds a heading to the page content", correct: false},
            {text: "Defines a section of the webpage", correct: false},
            {text: "Links the page to an external script", correct: false},
        ]
    },
    {
        question: "What is the default file extension for JavaScript files?",
        answers: [
            {text: ".js", correct: true},
            {text: ".java", correct: false},
            {text: ".script", correct: false},
            {text: ".jvs", correct: false},
        ]
    },
    {
    	question: "Which method is used to select an element by its ID in JavaScript?",
        answers: [
            {text: "document.getElementById()", correct: true},
            {text: "document.querySelector()", correct: false},
            {text: "document.getElementByClassName()", correct: false},
            {text: "document.getElement()", correct: false},
        ]
    }
];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
	currentQuestionIndex = 0;
	score = 0;
	nextButton.innerHTML = "Next";
	showQuestion();
}

function showQuestion(){
	resetState();
	let currentQuestion = questions[currentQuestionIndex];
	let questionNo = currentQuestionIndex + 1;
	questionElement.textContent = questionNo + ". " + currentQuestion.question;

	console.log(currentQuestion);
	currentQuestion.answers.forEach(answer => {
		console.log(answer.text);
		const button = document.createElement("button");
		button.textContent = answer.text;
		button.classList.add("btn");
		answerButtons.appendChild(button);
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener("click", selectAnswer);
	});
}

function resetState(){
	nextButton.style.display = "none";
	while(answerButtons.firstChild){
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e){
	const selectedBtn = e.target;
	const isCorrect = selectedBtn.dataset.correct === "true";
	if(isCorrect){
		selectedBtn.classList.add("correct");
		score ++;
	} else {
		selectedBtn.classList.add("incorrect");
	}
	Array.from(answerButtons.children).forEach(button => {
		if(button.dataset.correct === "true") {
			button.classList.add("correct");
		}
		button.disabled = true;
	});
	nextButton.style.display = "block";
}

function showScore(){
	resetState();
	questionElement.innerHTML = 'You scored ' + score + ' out of ' + questions.length + '!';
	nextButton.innerHTML = "Play again";
	nextButton.style.display = "block";
}

function handleNextButton(){
	currentQuestionIndex ++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});

startQuiz();
