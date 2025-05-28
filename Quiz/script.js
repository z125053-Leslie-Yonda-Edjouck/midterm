let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerId;

const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const resultBox = document.getElementById("result");

fetch("questions.json")
    .then(res => res.json())
    .then(data => {
        questions = data;
        showQuestion();
    })
    .catch(error => {
        console.error("Error loading questions:", error);
        questionText.textContent = "Error loading questions. Please try again.";
    });

function startTimer() {
    timeLeft = 30;
    const timerElement = document.createElement("div");
    timerElement.id = "timer";
    timerElement.textContent = `Time remaining: ${timeLeft}s`;
    document.querySelector(".quiz-box").insertBefore(timerElement, optionsContainer);
    timerElement.classList.add("visible");
    timerId = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time remaining: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerId);
            checkAnswer(-1);
        }
    }, 1000);
}

function showQuestion() {
    clearInterval(timerId);
    clearOptions();
    document.getElementById("question-count").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    document.getElementById("question-count").classList.add("visible");
    const q = questions[currentQuestionIndex];
    questionText.textContent = q.question;
    questionText.classList.add("visible");
    startTimer();
    q.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
        setTimeout(() => {
            button.classList.add("visible");
        }, 100); // Slight delay for animation
    });
    nextBtn.classList.add("visible");
}

function checkAnswer(selectedIndex) {
    clearInterval(timerId);
    const correct = questions[currentQuestionIndex].answer;
    if (selectedIndex === correct) {
        score++;
    }
    nextBtn.disabled = false;
    Array.from(optionsContainer.children).forEach((btn, i) => {
        btn.disabled = true;
        if (i === correct) btn.style.backgroundColor = "#a4edba";
        if (i === selectedIndex && i !== correct) btn.style.backgroundColor = "#f5a3a3";
    });
}

function clearOptions() {
    optionsContainer.innerHTML = "";
    nextBtn.disabled = true;
    const timerElement = document.getElementById("timer");
    if (timerElement) timerElement.remove();
}

nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    clearInterval(timerId);
    const quizBox = document.querySelector(".quiz-box");
    const percentage = (score / questions.length) * 100;
    let message = "";
    if (percentage >= 80) {
        message = "Excellent work!";
    } else if (percentage >= 50) {
        message = "Good job!";
    } else {
        message = "Keep practicing!";
    }
    quizBox.innerHTML = `
        <h2>Your score: ${score} / ${questions.length}</h2>
        <p>${percentage.toFixed(1)}% - ${message}</p>
        <button id="restartBtn">Restart Quiz</button>
    `;
    document.getElementById("restartBtn").addEventListener("click", () => {
        currentQuestionIndex = 0;
        score = 0;
        quizBox.innerHTML = `
            <div id="question-count">Question 1 of 30</div>
            <div id="question">Question will appear here</div>
            <div id="options"></div>
            <button id="nextBtn" disabled>Next</button>
            <div id="result"></div>
        `;
        nextBtn.disabled = true;
        showQuestion();
    });
    setTimeout(() => {
        quizBox.querySelector("h2").classList.add("visible");
        quizBox.querySelector("p").classList.add("visible");
        quizBox.querySelector("#restartBtn").classList.add("visible");
    }, 100);
}
