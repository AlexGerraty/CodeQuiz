const start_btn = document.querySelector(".start_btn");
const quit = document.querySelector(".quit");
const restart = document.querySelector(".restart");
const question_box = document.querySelector(".question_box");
const option_list = document.querySelector(".option_list");
const timer = document.getElementById("timer");
const score = document.getElementById("score");
const user_result = document.querySelector(".user_result");
const question_text = document.querySelector(".question");

let questions = [
    {
        question: "What does the abbreviation HTML stand for?",
        options: ["HyperText Markup Language", "HighText Markup Language", "HyperText Markdown Language", "None of the Above"],
        answer: "HyperText Markup Language"
    },
    {
        question: "How many sizes of headers are available in HTML by default?",
        options: ["5", "1", "3", "6"],
        answer: "6"
    },
    {
        question: "What is the smallest header in HTML by default",
        options: ["h1", "h2", "h6", "h4"],
        answer: "h6"
    },
    {
        question: "HTML files are saved by default with the extension",
        options: [".h", ".html", ".ht", "None of the Above"],
        answer: ".html"
    },
    {
        question: "Which of the following tags doesn’t require a closing tag",
        options: ["<br>", "<hr>", "Both A and B", "None of the Above"],
        answer: "Both A and B"
    }
];

let question_count = 0;
let score_count = 0;
let time_left = 60;

start_btn.onclick = () => {
    start_btn.style.display = "none";
    question_box.style.display = "block";
    timer.textContent = time_left;
    startTimer();
    showQuestion();
};

quit.onclick = () => {
    window.location.href = "http://127.0.0.1:5500/Code%20Quiz/index.html";
};

restart.onclick = () => {
    question_count = 0;
    score_count = 0;
    time_left = 60;
    question_box.style.display = "block";
    user_result.style.display = "none";
    timer.textContent = time_left;
    showQuestion();
};

function startTimer() {
    setInterval(() => {
        time_left--;
        timer.textContent = time_left;
        if (time_left <= 0) {
            clearInterval(startTimer);
            showResult();
        }
    }, 1000);
}

function showQuestion() {
    let questionText = questions[question_count].question;
    let options = questions[question_count].options;
    option_list.innerHTML = "";
    for (let i = 0; i < options.length; i++) {
        let option = document.createElement("li");
        option.classList.add("option");
        option.textContent = options[i];
        option.onclick = () => {
            if (options[i] == questions[question_count].answer) {
                score_count++;
                score.textContent = score_count;
            } else {
                time_left -= 10;
                timer.textContent = time_left;
            }
            question_count++;
            if (question_count < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        };
        option_list.appendChild(option);
    }
    question_text.textContent = questionText;
}

function showResult() {
    question_box.style.display = "none";
    user_result.style.display = "block";
    user_result.textContent = "Your Score: " + score_count;
}