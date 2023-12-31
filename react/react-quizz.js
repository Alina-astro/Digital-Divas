let currentQuestion = 0;
let score = 0;
let questions = [];

function loadQuestions() {
  fetch("react.json")
    .then((response) => response.json())
    .then((data) => {
      questions = data;
      displayQuestion(currentQuestion);
    });
  document.getElementById("home-button").style.display = "none";
}

function displayQuestion(questionNumber) {
  const questionContainer = document.getElementById("question-container");
  const currentQuestionData = questions[questionNumber];
  let optionsHtml = "";

  currentQuestionData.options.forEach((option) => {
    optionsHtml += `<input type="radio" name="option" value="${option.id}">${option.text}<br>`;
  });

  questionContainer.innerHTML = `
        <h2>${currentQuestionData.text}</h2>
        ${optionsHtml}
    `;
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const resultContainer = document.getElementById("result");

  if (selectedOption) {
    const selectedOptionId = parseInt(selectedOption.value);
    const currentQuestionData = questions[currentQuestion];
    const selectedOptionData = currentQuestionData.options.find(
      (option) => option.id === selectedOptionId
    );

    if (selectedOptionData.isCorrect) {
      score++;
      resultContainer.innerText = "Правильно!";
      resultContainer.style.color = "green";
    } else {
      resultContainer.innerText = "Неправильно.";
      resultContainer.style.color = "red";
    }
  } else {
    resultContainer.innerText = "Выберите вариант ответа.";
  }
}

function showResult() {
  const questionContainer = document.getElementById("question-container");
  questionContainer.innerHTML = `<h2>Квиз пройден! Ты молодец!</h2>`;
  document.getElementById("submit-button").style.display = "none";
  document.getElementById("next-button").style.display = "none";
  document.getElementById("quit-button").style.display = "none";
  document.getElementById("home-button").style.display = "inline";
}

function nextQuestion() {
  const resultContainer = document.getElementById("result");
  resultContainer.innerText = "";

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion(currentQuestion);
    document.getElementById("submit-button").disabled = false;
  } else {
    showResult();
  }
}

function quitQuiz() {
  window.location.href = "../index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  loadQuestions();

  document.getElementById("submit-button").addEventListener("click", () => {
    checkAnswer();
  });

  document.getElementById("next-button").addEventListener("click", () => {
    nextQuestion();
  });

  document.getElementById("quit-button").addEventListener("click", () => {
    quitQuiz();
  });

  document.getElementById("home-button").addEventListener("click", () => {
    window.location.href = "../index.html";
  });
});
