const cards = [
  { name: "6", value: 6, img: "6.png" },
  { name: "7", value: 7, img: "7.svg" },
  { name: "8", value: 8, img: "8.webp" },
  { name: "9", value: 9, img: "9.png" },
  { name: "10", value: 10, img: "10.avif" },
  { name: "Валет", value: 2, img: "valet.jpg" },
  { name: "Дама", value: 3, img: "koroleva.webp" },
  { name: "Король", value: 4, img: "king.jpg" },
  { name: "Туз", value: 11, img: "tuz.svg" }
];
let userName = prompt("Введіть своє ім’я:");
if (!userName || userName.trim() === "") {
    userName = "User";
}
document.getElementById("userName").textContent = userName;

let userScore = 0;
let computerScore = 0;
let attempt = 1;

const userCardImg = document.getElementById("userCard");
const computerCardImg = document.getElementById("computerCard");
const result = document.getElementById("result");
const generateBtn = document.getElementById("generate");
generateBtn.addEventListener("click", playRound);
function playRound() {
  if (attempt > 3) return;
  const userCard = cards[Math.floor(Math.random() * cards.length)];
  const compCard = cards[Math.floor(Math.random() * cards.length)];
  userCardImg.src = `cards/${userCard.img}`;
  computerCardImg.src = `cards/${compCard.img}`;
  userScore += userCard.value;
  computerScore += compCard.value;
  document.getElementById("userScore").textContent = userScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("attempt").textContent = `Спроба ${attempt} з 3`;
  attempt++;
  if (attempt > 3) {
    generateBtn.disabled = true;
    if (userScore > computerScore) {
      result.textContent = `${userName} виграв!`;
      result.style.color = "#00ff40";
    } else if (userScore < computerScore) {
      result.textContent = "Комп’ютер виграв";
      result.style.color = "#ff4040";
    } else {
      result.textContent = "Нічия";
      result.style.color = "#ffd740";
    }
  }
}
