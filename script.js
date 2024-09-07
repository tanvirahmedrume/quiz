const questions = [
    {
        question: "Whice is largest animal in this world",
        answer: [
            {text: "Shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "How manny chapter which consist of individual verses",
        answer: [
            {text: "113", correct: false},
            {text: "156", correct: false},
            {text: "114", correct: true},
            {text: "256", correct: false},
        ]
    },
    {
        question: "Whice is little animal in this world",
        answer: [
            {text: "Huming Bird", correct: true},
            {text: "Human", correct: false},
            {text: "Little Hen", correct: false},
            {text: "Ant", correct: false},
        ]
    },
    {
        question: "Whice is most popular OS in this world",
        answer: [
            {text: "Mac OS", correct: false},
            {text: "Linux", correct: false},
            {text: "Android", correct: false},
            {text: "Windows", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerContainer = document.getElementById("answer-container");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next"
    showQuestion();
}



function showQuestion(){
    resetState();
    let currentQuestion  = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerContainer.appendChild(button); 
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerContainer.firstChild) {
        answerContainer.removeChild(answerContainer.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === 'true';
    selectBtn.classList.remove("correct", "incorrect");
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerContainer.children).forEach(button =>{
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextBtn.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score ${score} out of the ${questions.length}!`;
    nextBtn.innerHTML = 'Play again';
    nextBtn.style.display = 'block';
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }
};

nextBtn.addEventListener('click', ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();
        }else{
            startQuiz();
        }
});


startQuiz();