const startBtn = document.querySelector('.start-btn');
const stopBtn = document.querySelector('.stop-btn');
const levelOptions = document.querySelector('.level-options');
const levelInput = document.querySelectorAll('.levels');
const input = document.getElementById('letter-input');
let randomNumber = document.getElementById('random-number');
const letter = document.querySelectorAll('.letter');
let numbers;
let interval;
let correctAnswer = document.getElementById('correct');
let numbersLeft = document.getElementById('left');
let incorrectAnswer = document.getElementById('incorrect');
let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
let findIndex;
let showNumber;
let correctNumbers = [];
let incorrectNumbers = [];
let correct;
let incorrect;
let time = 0;
let inputValue;

levelInput.forEach(function (lInput) {
    lInput.addEventListener('click', function (item) {
        let value = item.target.value;
        if (value == 'easy') {
            time = 5000;
        }
        if (value == 'medium') {
            time = 3500;
        }
        if (value == 'hard') {
            time = 2500;
        }
        startBtn.classList.remove('hide');
        randomNumber.textContent = "Game starts soon";
    });
});

startBtn.addEventListener('click', function () {
    letter.forEach(function (item) {
        item.style.color = "#ffffff";
    });
    numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
    correctNumbers = [];
    incorrectNumbers = [];
    correctAnswer.textContent = 0;
    incorrectAnswer.textContent = 0;
    levelOptions.style.display = "none";
    stopBtn.classList.remove('hide');
    startBtn.classList.add('hide');
    interval = setInterval(function () { getNumbers() }, time);
});

stopBtn.addEventListener('click', function () {
    levelOptions.style.display = "block";
    clearInterval(interval);
    stopBtn.classList.add('hide');
    randomNumber.textContent = "Choose difficulty to play again"
    letter.forEach(function (item) {
        item.style.color = "#ffffff";
    });
});

input.addEventListener('keypress', function (evt) {
    evt = evt || event;
    inputValue = String.fromCharCode(evt.which).toUpperCase();
    findIndex = letters.indexOf(inputValue) + 1;
    checkAnswer();
    input.style.display = "none";
});

function getRandom() {
    numbers.sort(function (a, b) { return 0.5 - Math.random() });
}

function getNumbers() {
    getRandom();
    input.style.display = "block";
    input.focus();
    input.value = '';
    
    if (numbers.length > 0) {
        showNumber = numbers.shift();
        randomNumber.textContent = showNumber;
        numbersLeft.textContent = numbers.length;
        letter.forEach(function (item) {
            let value = item.dataset.n;
    
            if (value == showNumber) {
                item.style.color = "red";
                incorrectNumbers.push(value);
                incorrectAnswer.textContent = incorrectNumbers.length;
            }
        });
        checkAnswer();
        
    } else {
        incorrectAnswer.textContent = incorrectNumbers.length;
        randomNumber.textContent = "You have finished";
        stopBtn.classList.add('hide');
        levelOptions.style.display = "block";
        input.style.display = "none";
        clearInterval(interval);
    }
}

function checkAnswer() {
    if (findIndex == showNumber) {
        letter.forEach(function (item) {
            let value = item.dataset.v;

            if (value.includes(inputValue)) {
                item.style.color = "green";
            }
        });
        input.style.display = "none";
        correct = incorrectNumbers.splice(-1, 1);
        correctNumbers.push(correct);
        correctAnswer.textContent = correctNumbers.length;
    }
}