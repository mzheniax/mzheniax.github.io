$(function(){
  const TOTAL = 10; 
  const WORDS = [
    {en: "always", ua: "завжди"},
    {en: "apple", ua: "яблуко"},
    {en: "book", ua: "книга"},
    {en: "water", ua: "вода"},
    {en: "house", ua: "дім"},
    {en: "car", ua: "автомобіль"},
    {en: "friend", ua: "друг"},
    {en: "sun", ua: "сонце"},
    {en: "day", ua: "день"},
    {en: "night", ua: "ніч"},
    {en: "school", ua: "школа"},
    {en: "city", ua: "місто"},
    {en: "work", ua: "робота"},
    {en: "family", ua: "сім'я"},
    {en: "tree", ua: "дерево"}
  ];
  function shuffle(arr){
    const a = arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }
  deck = shuffle(WORDS)
      .slice(0, Math.min(TOTAL, WORDS.length))
      .map(w => ({ ...w, checked: false }));
  const totalCount = deck.length;
  let current = 0;
  let correct = 0;
  let incorrect = 0;
  const $word = $('#word');
  const $answer = $('#answer');
  const $index = $('#index');
  const $total = $('#total');
  const $correctCount = $('#correct-count');
  const $incorrectCount = $('#incorrect-count');
  const $card = $('#card');
  const $modal = $('#modal');

  $total.text(totalCount);

  function showCard(i){
    const w = deck[i];
    $word.text(w.en);
    $index.text(i+1);
    $answer.val('').focus();
  }

function checkAnswer(){
    if(current >= totalCount) return;

    // Якщо вже було перевірено — забороняємо повторну перевірку
    if(deck[current].checked) return;

    const user = $answer.val().trim().toLowerCase();
    const correctAnswer = deck[current].ua.trim().toLowerCase();

    const correctVariants = correctAnswer.split(',').map(s=>s.trim());
    const isCorrect = correctVariants.includes(user) && user.length>0;

    if(isCorrect){
        correct++;
        flashCard('correct');
    } else {
        incorrect++;
        flashCard('incorrect');
    }

    deck[current].checked = true; // ПОЗНАЧАЄМО ЯК ПЕРЕВІРЕНЕ

    updateStats();

    current++;
    if(current < totalCount){
        setTimeout(()=> showCard(current), 300);
    } else {
        setTimeout(()=> showModal(), 400);
    }
}


  function checkAnswer(){
    if(current >= totalCount) return;
    const user = $answer.val().trim().toLowerCase();
    const correctAnswer = deck[current].ua.trim().toLowerCase();
    const correctVariants = correctAnswer.split(',').map(s=>s.trim());
    const isCorrect = correctVariants.includes(user) && user.length>0;

    if(isCorrect){
      correct++;
      flashCard('correct');
    } else {
      incorrect++;
      flashCard('incorrect');
    }
    updateStats();
    current++;
    if(current < totalCount){
      setTimeout(()=> showCard(current), 300);
    } else {
      setTimeout(()=> showModal(), 400);
    }
  }
  function flashCard(kind){
    if(kind === 'correct'){
      $card.css('box-shadow', '0 8px 20px rgba(46, 204, 113, 0.25)');
      $card.animate({opacity:0.98}, 80).animate({opacity:1},80, ()=> {
        setTimeout(()=> $card.css('box-shadow', ''), 220);
      });
    } else {
      $card.css('box-shadow', '0 8px 20px rgba(231, 76, 60, 0.25)');
      $card.animate({opacity:0.98}, 80).animate({opacity:1},80, ()=> {
        setTimeout(()=> $card.css('box-shadow', ''), 220);
      });
    }
  }

  function updateStats(){
    $correctCount.text(correct);
    $incorrectCount.text(incorrect);
  }
  function showModal(){
    const percent = Math.round((correct / totalCount) * 100);
    $('#modal-correct').text(correct);
    $('#modal-incorrect').text(incorrect);
    $('#modal-level').text(percent + '%');
    let msg = '';
    if(percent >= 90) msg = 'Відмінно! Чудовий рівень знань.';
    else if(percent >= 70) msg = 'Добре — твій рівень вище середнього.';
    else if(percent >= 50) msg = 'Задовільно — є над чим працювати.';
    else msg = 'Потрібно більше практики. Продовжуй!';

    $('#modal-msg').text(msg);
    $modal.removeClass('hidden');
  }

  function closeModal(){
    $modal.addClass('hidden');
  }
  function restart(){
    deck = shuffle(WORDS).slice(0, Math.min(TOTAL, WORDS.length));
    current = 0;
    correct = 0;
    incorrect = 0;
    updateStats();
    $total.text(deck.length);
    showCard(0);
    closeModal();
  }
  $card.on('click', function(){
    checkAnswer();
  });
  $answer.on('keypress', function(e){
    if(e.which === 13){
      e.preventDefault();
      checkAnswer();
    }
  });
  $('#prev').on('click', function(){
    if(current>0){
      current--;
      showCard(current);
    }
  });
  $('#next').on('click', function(){
    if(current < totalCount - 1){
      current++;
      showCard(current);
    }
  });
  $('#show-stats').on('click', function(){
    showModal();
  });
  $('#restart').on('click', function(){
    restart();
  });
  $('#modal-close').on('click', function(){ closeModal(); });
  $('#modal-restart').on('click', function(){ restart(); });
  $modal.on('click', function(e){
    if(e.target === this) closeModal();
  });
  updateStats();
  showCard(0);
});
