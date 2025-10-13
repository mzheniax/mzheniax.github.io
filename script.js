const input = document.getElementById("inputString");
const result = document.getElementById("result");

input.addEventListener("input", () => {
  const text = input.value.trim();
  if (text === "") {
    result.textContent = "Будь ласка, введіть рядок.";
    return;
  }
  const words = text.split(" ");
  const firstLetter = words[0][0].toLowerCase();
  const filtered = words.filter(w => w[0].toLowerCase() === firstLetter);
  result.innerHTML = "Слова, які починаються з літери '" + firstLetter + "': " + filtered.join(", ");
});
