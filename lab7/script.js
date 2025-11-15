const container = document.createElement('div');
container.className = 'container';

const inputBlock = document.createElement('div');
inputBlock.className = 'inputBlock';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Введіть питання...';
input.className = 'input';

const button = document.createElement('button');
button.textContent = 'Запитати кулю';
button.className = 'button';

inputBlock.append(input, button);
container.appendChild(inputBlock);

const ball = document.createElement('div');
ball.className = 'ball';
ball.textContent = '?';
container.appendChild(ball);

const warning = document.createElement('p');
warning.className = 'warning';
warning.style.color = 'red';
warning.style.display = 'none';
warning.textContent = 'Будь ласка, введіть питання!';
container.appendChild(warning);

document.body.appendChild(container);

const answers = [
  'Так',
  'Ні',
  'Можливо',
  'Частково',
  'Запитай знову',
  'Ймовірно ні',
  'Ймовірно так',
  'Абсолютно так',
  'Абсолютно ні',
];

button.addEventListener('click', () => {
  const question = input.value.trim();
  if (question === '') {
    warning.style.display = 'block';
    input.style.border = '2px solid red';
    ball.textContent = '?';
    return;
  }
  warning.style.display = 'none';
  input.style.border = '';
  ball.style.transform = 'rotateY(360deg)';
  setTimeout(() => {
    const randomAnswer = answers[Math.floor(Math.random() * answers.length)];
    ball.textContent = randomAnswer;
    ball.style.transform = 'rotateY(0deg)';
  }, 300);
});
