const images = [
    "apple.jpg",
    "pear.jpg",
    "lemon.jpg",
    "apricot.jpg",
    "cherry.jpg"
];
let attempts = 0;
const maxAttempts = 3;
let userName = prompt("Введіть своє ім’я:");
if (!userName || userName.trim() === "") {
    userName = "User";
}
const nameField = document.getElementById("userName");
const attemptsField = document.getElementById("attempts");
const resultField = document.getElementById("result");
const button = document.getElementById("generate");
const slotMachine = document.getElementById("slotMachine");
nameField.textContent = userName;
updateAttempts();
button.addEventListener("click", () => {
    if (attempts >= maxAttempts) return;
    attempts++;
    updateAttempts();
    generateSlots();
    if (attempts >= maxAttempts) button.disabled = true;
});
function updateAttempts() {
    attemptsField.textContent = `Спроба ${attempts} з ${maxAttempts}`;
}
function generateSlots() {
    slotMachine.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        const column = document.createElement("div");
        column.classList.add("column");

        const used = new Set();
        for (let j = 0; j < 3; j++) {
            let imgIndex;
            do {
                imgIndex = Math.floor(Math.random() * images.length);
            } while (used.has(imgIndex));
            used.add(imgIndex);
            const img = document.createElement("img");
            img.src = `images/${images[imgIndex]}`;
            column.appendChild(img);
        }
        slotMachine.appendChild(column);
    }
    checkWin();
}
function checkWin() {
    const rows = [[], [], []];
    const columns = document.querySelectorAll(".column");
    columns.forEach((col, i) => {
        const imgs = col.querySelectorAll("img");
        imgs.forEach((img, j) => {
            rows[j][i] = img.src;
        });
    });
    for (let row of rows) {
        if (row[0] === row[1] && row[1] === row[2]) {
            resultField.textContent = `Вітаємо, ${userName}! Ви перемогли!`;
            button.disabled = true;
            return;
        }
    }
    if (attempts === maxAttempts) {
        resultField.textContent = `На жаль, ви не виграли цього разу.`;
    }
}
