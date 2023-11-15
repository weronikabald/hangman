
window.onload = function() {
    var words = ["apple", "banana", "cherry", "peach", "strawberry", "fig", "grape", "orange", "kiwi", "mango", "watermelon", "pineapple", "plum", "pear", "blueberry", "raspberry", "blackberry", "lemon", "lime", "pomegranate"];
    var wins = 0;
    var losses = 0;
    var currentWord;
    var displayWord;
    var guesses;
    var maxWrongGuesses = 8;

    var wordContainer = document.getElementById("wordContainer");
    var lettersContainer = document.getElementById("letters");
    var resetButton = document.getElementById("reset");
    var hangmanImage = document.getElementById("hangmanImage");
    var winsElement = document.getElementById("wins");
    var lossesElement = document.getElementById("losses");
    var setNameButton = document.getElementById('setName');
    var nameInput = document.getElementById('nameInput');
    var usernameSpan = document.getElementById('username');

    setNameButton.onclick = function() {
        var name = nameInput.value.trim();
        if (name) {
            usernameSpan.textContent = name;
        }
        var name = nameInput.value.trim();
        if (name) {
            usernameSpan.textContent = name;
            winsElement.textContent = '0';
            lossesElement.textContent = '0';
        }
    };


    function startGame() {
        currentWord = words[Math.floor(Math.random() * words.length)];
        displayWord = "_".repeat(currentWord.length);
        guesses = 0;
        updateDisplay();
        generateLetters();
    }

    function updateDisplay() {
        wordContainer.textContent = displayWord.split('').join(' ');
        hangmanImage.src = "hangman_" + guesses + ".png";
    }

    function generateLetters() {
        lettersContainer.innerHTML = '';
        for (var i = 65; i <= 90; i++) {
            var button = document.createElement("button");
            button.textContent = String.fromCharCode(i);
            button.onclick = function() {
                guess(this.textContent.toLowerCase());
                this.classList.add('clicked'); // Add 'clicked' class to the button
                this.disabled = true; // Optionally disable the button
            };
            lettersContainer.appendChild(button);
        }
    }

    function guess(letter) {
        var correct = false;
        var newDisplayWord = '';

        for (var i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === letter) {
                newDisplayWord += letter;
                correct = true;
            } else {
                newDisplayWord += displayWord[i];
            }
        }

        displayWord = newDisplayWord;
        updateDisplay();

        if (!correct) {
            guesses++;
            updateDisplay();
            if (guesses === maxWrongGuesses) {
                alert("You lost! The word was " + currentWord);
                losses++;
                lossesElement.textContent = losses;
                startGame();
            }
        } else if (displayWord === currentWord) {
            alert("You won! :D");
            wins++;
            winsElement.textContent = wins;
            startGame();
        }
    }

    resetButton.onclick = startGame;
    startGame();
};
