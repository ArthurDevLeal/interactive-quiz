// Innitial data
let manyQuestions = questions.length;
let currentQuestion = 0;
let correctQuestions = 0;
let numberOfQuestion = [];
renderQuestion();
// Events
document.querySelector(".scoreArea .reset").addEventListener("click", reset);
document.querySelector(".scoreArea .sumary").addEventListener("click", makeSumary);

// Functions
function renderQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let progressBar = Math.floor((currentQuestion / manyQuestions) * 100);
        document.querySelector(".progress--bar").style.width = `${progressBar}%`;

        document.querySelector(".scoreArea").style.display = "none";
        document.querySelector(".questionArea").style.display = "block";

        document.querySelector(".question").innerHTML = `<span>${currentQuestion + 1}</span>${q.question}`;

        let optionsHtml = "";
        for (let i in q.options) {
            optionsHtml += `<div data-op = "${i}" class= "option"><span>${parseInt(i) + 1}</span>${q.options[i]}</div>`;
            document.querySelector(".options").innerHTML = optionsHtml;
        }
        document.querySelectorAll(".options").forEach((item) => {
            item.addEventListener("click", optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e, q) {
    let clickedOption = e.target.getAttribute("data-op");
    if (questions[currentQuestion].answer === parseInt(clickedOption)) {
        ++correctQuestions;
    } else {
        numberOfQuestion.push(currentQuestion);
    }
    ++currentQuestion;
    renderQuestion();
}
function finishQuiz() {
    document.querySelector(".progress--bar").style.width = `100%`;
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".questionArea").style.display = "none";

    document.querySelector(".scorePct").innerHTML = `Acertou ${Math.floor((correctQuestions / manyQuestions) * 100)}%`;
    document.querySelector(".scoreText2").innerHTML = `Você respondeu ${manyQuestions} questões e acertou ${correctQuestions}.`;
    console.log(numberOfQuestion);
}
function reset() {
    currentQuestion = 0;
    correctQuestions = 0;
    numberOfQuestion = [];
    renderQuestion();
}
function makeSumary() {
    let html = "";
    if (numberOfQuestion.length > 0) {
        html = `<div class="question">Voce errou as questoes: </div>`;
    } else {
        html = `<div class="question">Voce não errou nenhuma questão, parabens! </div>`;
    }

    for (let i = 0; i < numberOfQuestion.length; i++) {
        html += `<div class="option" style="cursor: default;"><span>${parseInt(numberOfQuestion[i]) + 1}</span>${
            questions[numberOfQuestion[i]].question
        }</div>`;
    }

    html += `<button class="backToScore">Voltar</button>`;
    document.querySelector(".divSumary").innerHTML = html;
    document.querySelector(".scoreArea").style.display = "none";
    document.querySelector(".divSumary").style.display = "block";

    document.querySelector(".backToScore").addEventListener("click", backToScore);
}
function backToScore() {
    document.querySelector(".scoreArea").style.display = "block";
    document.querySelector(".divSumary").style.display = "none";
}
