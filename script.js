$(document).ready(function() {
    const wordDictionary = {
        easy: [
            { english: "hello", ukrainian: "привіт" },
            { english: "house", ukrainian: "будинок" },
            { english: "cat", ukrainian: "кіт" },
            { english: "dog", ukrainian: "собака" },
            { english: "sun", ukrainian: "сонце" },
            { english: "book", ukrainian: "книга" },
            { english: "water", ukrainian: "вода" },
            { english: "tree", ukrainian: "дерево" },
            { english: "mother", ukrainian: "мати" },
            { english: "father", ukrainian: "батько" }
        ],
        medium: [
            { english: "beautiful", ukrainian: "красивий" },
            { english: "difficult", ukrainian: "важкий" },
            { english: "important", ukrainian: "важливий" },
            { english: "interesting", ukrainian: "цікавий" },
            { english: "possible", ukrainian: "можливий" },
            { english: "different", ukrainian: "різний" },
            { english: "government", ukrainian: "уряд" },
            { english: "education", ukrainian: "освіта" },
            { english: "development", ukrainian: "розвиток" },
            { english: "information", ukrainian: "інформація" }
        ],
        hard: [
            { english: "accommodation", ukrainian: "житло" },
            { english: "environment", ukrainian: "навколишнє середовище" },
            { english: "responsibility", ukrainian: "відповідальність" },
            { english: "significance", ukrainian: "значення" },
            { english: "approximately", ukrainian: "приблизно" },
            { english: "characteristic", ukrainian: "характеристика" },
            { english: "comprehensive", ukrainian: "всебічний" },
            { english: "establishment", ukrainian: "заклад" },
            { english: "infrastructure", ukrainian: "інфраструктура" },
            { english: "sophisticated", ukrainian: "вишуканий" }
        ]
    };

    let state = {
        currentDifficulty: 'easy',
        currentWord: null,
        usedWords: [],
        statistics: {
            correct: 0,
            wrong: 0
        },
        currentProgress: 0,
        totalQuestions: 10,
        score: 0,
        isAnswerChecked: false
    };

    function init() {
        bindEvents();
        generateNewQuestion();
        updateUI();
    }

    function bindEvents() {
        $('input[name="difficulty"]').change(function() {
            state.currentDifficulty = $(this).val();
            resetTest();
        });

        $('#checkTranslation').click(checkTranslation);

        $('#translationInput').keypress(function(e) {
            if (e.which === 13 && !state.isAnswerChecked) {
                checkTranslation();
            }
        });
        $('#nextQuestion').click(nextQuestion);
        $('#resetTest').click(resetTest);
    }

    function checkTranslation() {
        const userInput = $('#translationInput').val().trim().toLowerCase();
        
        if (!userInput) {
            showMessage('Будь ласка, введіть переклад!', 'error');
            return;
        }

        state.isAnswerChecked = true;
        $('#translationInput').prop('disabled', true);
        $('#checkTranslation').prop('disabled', true);

        const isCorrect = userInput === state.currentWord.ukrainian.toLowerCase();
        
        if (isCorrect) {
            state.statistics.correct++;
            state.score += getPointsForDifficulty();
            showMessage('Правильно!', 'correct');
            $('#translationInput').addClass('success');
        } else {
            state.statistics.wrong++;
            showMessage(`Неправильно! Правильна відповідь: "${state.currentWord.ukrainian}"`, 'wrong');
            $('#translationInput').addClass('error');
        }

        $('#nextQuestion').prop('disabled', false);
        
        updateUI();
    }

    function generateNewQuestion() {
        const availableWords = wordDictionary[state.currentDifficulty].filter(
            word => !state.usedWords.includes(word.english)
        );

        if (availableWords.length === 0) {
            state.usedWords = [];
        }

        const randomIndex = Math.floor(Math.random() * availableWords.length);
        state.currentWord = availableWords[randomIndex];
        state.usedWords.push(state.currentWord.english);
        state.isAnswerChecked = false;

        $('#wordToTranslate').text(state.currentWord.english);
        $('#translationInput').val('').prop('disabled', false).removeClass('success error');
        $('#checkTranslation').prop('disabled', false);
        $('#nextQuestion').prop('disabled', true);
        $('#resultMessage').removeClass('correct wrong').text('');
    }

    function nextQuestion() {
        state.currentProgress++;
        
        if (state.currentProgress >= state.totalQuestions) {
            finishTest();
            return;
        }

        generateNewQuestion();
        updateUI();
    }

    function finishTest() {
        const successRate = (state.statistics.correct / state.totalQuestions) * 100;
        let message = `Тест завершено!\n`;
        message += `Правильних відповідей: ${state.statistics.correct}/${state.totalQuestions}\n`;
        message += `Успішність: ${successRate.toFixed(1)}%\n`;
        
        alert(message);
        resetTest();
    }

    function resetTest() {
        state.statistics = { correct: 0, wrong: 0 };
        state.currentProgress = 0;
        state.score = 0;
        state.usedWords = [];
        generateNewQuestion();
        updateUI();
    }

    function updateUI() {
        $('.progress-text').text(`${state.currentProgress}/${state.totalQuestions}`);
        const progressPercent = (state.currentProgress / state.totalQuestions) * 100;
        $('.progress-fill').css('width', progressPercent + '%');
        
        
        $('#correctCount').text(state.statistics.correct);
        $('#wrongCount').text(state.statistics.wrong);
    }
    function showMessage(text, type) {
        const $message = $('#resultMessage');
        $message.text(text).removeClass('correct wrong').addClass(type);
    }
    function getPointsForDifficulty() {
        switch(state.currentDifficulty) {
            case 'easy': return 10;
            case 'medium': return 20;
            case 'hard': return 30;
            default: return 10;
        }
    }
    init();
});