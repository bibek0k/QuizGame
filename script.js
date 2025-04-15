
const questions = [
    { question: "What is chemical formula for water?", options: ["H₂O", "CO₂", "O₂", "N₂"], correct: 0 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"], correct: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"], correct: 1 },
    { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"], correct: 0 },
    { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Fe", "Pb"], correct: 0 },
    { question: "Which gas do plants absorb from the atmosphere?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
    { question: "What is the powerhouse of the cell?", options: ["Nucleus", "Mitochondria", "Ribosome", "Endoplasmic Reticulum"], correct: 1 },
    { question: "Who is the developer of this page?", options: ["Barni", "Ash", "Bibek", "Alax"], correct: 2 }
    
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 30;
  
  const questionText = document.querySelector(".question h3");
  const questionNumber = document.querySelector(".Qhead h2");
  const optionsForm = document.querySelector("form");
  const timerDisplay = document.querySelector(".timer");
  const quizContainer = document.getElementById("quizContainer");
  const landingPage = document.getElementById("landing");
  const startButton = document.getElementById("startButton");
  const leaderboardTable = document.querySelector(".leaderboard-table");
  
  startButton.addEventListener("click", () => {
    landingPage.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
  });
  
  function startQuiz() {
    currentQuestion = 0;
    score = 0;
    timerDisplay.style.display = "block";
    renderQuestion(currentQuestion);
  }
  
  function renderQuestion(index) {
    const q = questions[index];
    questionNumber.textContent = `Q${index + 1}`;
    questionText.innerHTML = q.question;
    optionsForm.innerHTML = "";
  
    q.options.forEach((opt, i) => {
      const id = `option${i}`;
      optionsForm.innerHTML += `
        <input type="radio" id="${id}" name="options" value="${i}">
        <label for="${id}" class="custom-radio">${opt}</label><br>
      `;
    });
  
    const submitBtn = document.createElement("input");
    submitBtn.type = "submit";
    submitBtn.value = currentQuestion < questions.length - 1 ? "Next" : "Finish";
    submitBtn.className = "submit-button";
    optionsForm.appendChild(submitBtn);
  
    timeLeft = 30;
    updateTimerDisplay();
    clearInterval(timer);
    startTimer();
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(timer);
        moveToNextQuestion();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    timerDisplay.textContent = `00:${timeLeft.toString().padStart(2, '0')}`;
  }
  
  optionsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    clearInterval(timer);
    const selected = optionsForm.querySelector("input[name='options']:checked");
    if (selected && parseInt(selected.value) === questions[currentQuestion].correct) score++;
    moveToNextQuestion();
  });
  
  function moveToNextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      renderQuestion(currentQuestion);
    } else {
      showResult();
    }
  }
  
  function showResult() {
    questionNumber.textContent = "Great!";
    questionText.innerHTML = `You scored <strong>${score}</strong> out of <strong>${questions.length}</strong>!`;
    timerDisplay.style.display = "none";
  
    const name = prompt("Enter your name for the leaderboard:");
    if (name) {
      const newScore = { name: name.trim() || "Anonymous", score };
      const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");
      leaderboard.push(newScore);
      leaderboard.sort((a, b) => b.score - a.score);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      renderLeaderboard();
    }
  
    optionsForm.innerHTML = `<button class="submit-button" onclick="restartQuiz()">Try Again</button>`;
  }
  
  function restartQuiz() {
    startQuiz();
  }
  
  function renderLeaderboard() {
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]").slice(0, 5);
    const rows = leaderboard.map((entry, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
      </tr>
    `);
    leaderboardTable.innerHTML = `
      <tr><th>Rank</th><th>Name</th><th>Score</th></tr>
      ${rows.join("")}
    `;
  }
  
  function clearLeaderboard() {
    localStorage.removeItem("leaderboard");
    renderLeaderboard();
  }
  
  renderLeaderboard();



const circul = document.getElementById("circul");
const body = document.querySelector("body");
const back = document.querySelector(".toggle-box");

back.addEventListener("click", () => {
    circul.classList.toggle("move");
    body.classList.toggle("dark");
    circul.classList.toggle("circul1");
    back.classList.toggle("box1");
});

  