
const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Home Text Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which language is used for styling web pages?",
        answers: ["Python", "CSS", "Java", "C++"],
        correct: 1
    },
    {
        question: "Which tag is used for a heading in HTML?",
        answers: ["<p>", "<h1>", "<br>", "<img>"],
        correct: 1
    },
    {
        question: "Which language adds interactivity to websites?",
        answers: ["HTML", "CSS", "JavaScript", "SQL"],
        correct: 2
    },
    {
        question: "Which tag creates a hyperlink?",
        answers: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const scoreElement = document.getElementById("score");

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerText = "Time: " + timeLeft + " seconds";

    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = "Time: " + timeLeft + " seconds";

        if (timeLeft <= 0) {
            clearInterval(timer);
            Array.from(answerButtons.children).forEach(btn => {
                btn.disabled = true;
            });
            nextButton.style.display = "inline-block";
        }
    }, 1000);
}

function showQuestion() {
    clearInterval(timer);
    nextButton.style.display = "none";
    scoreElement.innerText = "";

    let q = questions[currentQuestion];
    questionElement.innerText =
        (currentQuestion + 1) + ". " + q.question;

    answerButtons.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("answer");
        button.onclick = () => selectAnswer(index, button);
        answerButtons.appendChild(button);
    });

    startTimer();
}

function selectAnswer(index, button) {
    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].correct;

    Array.from(answerButtons.children).forEach((btn, i) => {
        btn.disabled = true;

        if (i === correctAnswer) {
            btn.classList.add("correct");
        }
    });

    if (index === correctAnswer) {
        score++;
        scoreElement.innerText = "Correct Answer!";
    } else {
        button.classList.add("wrong");
        scoreElement.innerText = "Wrong Answer!";
    }

    nextButton.style.display = "inline-block";
}

nextButton.onclick = () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    clearInterval(timer);

    questionElement.innerText = "Quiz Completed!";
    answerButtons.innerHTML = "";

    timerElement.innerText = "";
    scoreElement.innerText =
        "Your Score: " + score + " / " + questions.length;

    nextButton.innerText = "Restart Quiz";
    nextButton.style.display = "inline-block";

    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        nextButton.innerText = "Next Question";
        nextButton.onclick = nextHandler;
        showQuestion();
    };
}

function nextHandler() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

nextButton.onclick = nextHandler;

showQuestion();
