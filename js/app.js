const startBtn = document.querySelector('.start-btn');
        const stopBtn = document.querySelector('.stop-btn');
        const levelOptions = document.querySelector('.level-options');
        const levelInput = document.querySelectorAll('.levels');
        const input = document.getElementById('letter-input');
        let randomNumber = document.getElementById('random-number');
        const letter = document.querySelectorAll('.letter');
        let interval;
        let correctAnswer = document.getElementById('correct');
        let numbersLeft = document.getElementById('left');
        let incorrectAnswer = document.getElementById('incorrect');
        let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
        let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let findIndex;
        let showNumber;
        let correct = 1;
        let incorrect = 1;
        let time = 0;

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
            });
        });

        function start() {
            interval = setInterval(function () { getNumbers(); }, time);
        }

        function getNumbers() {
            stopBtn.classList.remove('hide');
            startBtn.classList.add('hide');
            input.value = '';
            input.style.display = "block";
            levelOptions.style.display = "none";
            input.focus();
            if (numbers.length > 0) {
                getRandom();
                showNumber = numbers.shift();
                numbersLeft.textContent = numbers.length;
                if (showNumber != findIndex) {
                    incorrectAnswer.textContent = (incorrect++) - correct + 1;
                    letter.forEach(function (item) {
                        let char = item.dataset.n;

                        if (char == showNumber) {
                            item.style.color = "red";
                        }
                    });
                }
                randomNumber.textContent = showNumber;

            } else {
                randomNumber.textContent = "You have finished";
                stop();
            }
        }

        function stop() {
            clearInterval(interval);
            incorrect = 0;
            correct = 0;
            interval = setInterval(getNumbers(), time);
            numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
            incorrectAnswer.textContent = "0";
            numbersLeft.textContent = "0";
            levelOptions.style.display = "block";
            startBtn.classList.remove('hide');
            stopBtn.classList.add('hide');
            randomNumber.innerHTML = "Press start to play again";
            letter.forEach(function (item) {
                item.style.color = "#ffffff";
            });
        }

        input.addEventListener('keypress', function (evt) {
            evt = evt || event;
            let inputValue = String.fromCharCode(evt.which).toUpperCase();
            findIndex = letters.indexOf(inputValue) + 1;
            if (findIndex === showNumber) {
                document.getElementById('correct').innerHTML = correct++;
                letter.forEach(function (item) {
                    let char = item.dataset.v;

                    if (char.includes(inputValue)) {
                        item.style.color = "green";
                    }
                });
            } else {
                incorrectAnswer.textContent = (incorrect++) - correct;
            }
            input.style.display = 'none';
        });

        function getRandom() {
            numbers.sort(function (a, b) { return 0.5 - Math.random() });
        }
