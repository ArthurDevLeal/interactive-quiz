// Innitial data
let manyQuestions = questions.length;
let currentQuestion = 0;
let correctQuestions = 0;
renderQuestion();
// Events
document.querySelector(".scoreArea button").addEventListener("click", reset);

// Functions
function renderQuestion() {
    if (questions[currentQuestion]) {
        let q = questions[currentQuestion];

        let progressBar = Math.floor((currentQuestion / manyQuestions) * 100);
        document.querySelector(".progress--bar").style.width = `${progressBar}%`;

        document.querySelector(".scoreArea").style.display = "none";
        document.querySelector(".questionArea").style.display = "block";

        document.querySelector(".question").innerHTML = q.question;

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
}
function reset() {
    currentQuestion = 0;
    correctQuestions = 0;
    renderQuestion()
}
