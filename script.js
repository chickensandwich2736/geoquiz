const questions = [
    {
        question: "What is the capital of the United States? ",
        answers: [
            {text: "New York", correct: false},
            {text: "Chicago", correct: false},
            {text: "Washington", correct: true},
            {text: "Los Angeles", correct: false},
        ]
    },
    {
        question: "What is the largest desert in the world?",
        answers: [
            {text: "Gobi Desert", correct: false},
            {text: "Sahara Desert", correct: true},
            {text: "Mojave Desert", correct: false},
            {text: "Arabian Desert", correct: false},
        ]
    },
    {
        question: "Which country has the most islands in the world?",
        answers: [
            {text: "Sweden", correct: true},
            {text: "Finland", correct: false},
            {text: "Canada", correct: false},
            {text: "Indonesia", correct: false},
        ]
    },
    {
        question: "Which state is the majority of Yellowstone in?",
        answers: [
            {text: "Idaho", correct: false},
            {text: "Wyoming", correct: true},
            {text: "Montana", correct: false},
            {text: "Utah", correct: false},

        ]
    },



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
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButtons.appendChild(button);
        if(answer.correct){
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
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You answered ${score} out of ${questions.length} correctly!`;
    nextButton.innerHTML = "Play Again?"
    nextButton.style.display = "block"
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }
    else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();