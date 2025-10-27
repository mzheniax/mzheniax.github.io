let userName = prompt("Введіть ім'я:");
if (!userName || userName.trim() === "") {
  userName = "User";
}
document.querySelector(".label").textContent = userName;
let userScore = 0;
let computerScore = 0;
const userNumberEl = document.getElementById("userNumber");
const computerNumberEl = document.getElementById("computerNumber");
const userScoreEl = document.getElementById("userScore");
const computerScoreEl = document.getElementById("computerScore");
const generateBtn = document.getElementById("generateBtn");
generateBtn.addEventListener("click", () => {
  if (userScore >= 3 || computerScore >= 3) {
    alert("Гру завершено! Оновіть сторінку, щоб почати знову.");
    return;
  }
  const userNum = Math.floor(Math.random() * 10) + 1;
  const computerNum = Math.floor(Math.random() * 10) + 1;
  userNumberEl.textContent = userNum;
  computerNumberEl.textContent = computerNum;
  if (userNum > computerNum) {
    userScore++;
  } else if (computerNum > userNum) {
    computerScore++;
  }
  userScoreEl.textContent = userScore;
  computerScoreEl.textContent = computerScore;
  if (userScore === 3) {
    alert("${userName} переміг!");
  } else if (computerScore === 3) {
    alert("Комп'ютер переміг!");
  }
});
