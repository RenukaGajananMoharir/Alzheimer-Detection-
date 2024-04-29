const wordList = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango', 'Pineapple', 'Strawberry', 'Watermelon', 'Cherry', 'Peach'];
let correctWords = [];
let selectedWords = [];
let correctMatches = 0;
let wrongMatches = 0;

function startGame() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('words-list').style.display = 'block';
    document.getElementById('word-list').innerHTML = '';
    correctWords = [];
    selectedWords = [];
    correctMatches = 0;
    wrongMatches = 0;
    shuffle(wordList);
    for (let i = 0; i < 10; i++) {
        correctWords.push(wordList[i]);
        const listItem = document.createElement('li');
        listItem.textContent = wordList[i];
        document.getElementById('word-list').appendChild(listItem);
    }
}

function startTest() {
    document.getElementById('words-list').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('word-boxes').innerHTML = '';
    selectedWords = [];
    for (let i = 0; i < 10; i++) {
        selectedWords.push(correctWords[i]);
    }
    const remainingWords = getRemainingWords();
    for (let word of remainingWords) {
        selectedWords.push(word);
    }
    shuffle(selectedWords);
    for (let word of selectedWords) {
        const wordBox = document.createElement('div');
        wordBox.textContent = word;
        wordBox.className = 'word-box';
        wordBox.addEventListener('click', () => {
            if (!wordBox.classList.contains('clicked')) {
                wordBox.classList.add('clicked');
                if (correctWords.includes(wordBox.textContent)) {
                    wordBox.classList.add('correct');
                } else {
                    wordBox.classList.add('wrong');
                }
            } else {
                wordBox.classList.remove('clicked');
                wordBox.classList.remove('correct');
                wordBox.classList.remove('wrong');
            }
        });
        document.getElementById('word-boxes').appendChild(wordBox);
    }
}

function submitAnswers() {
    const selectedBoxes = document.querySelectorAll('.word-box.clicked');
    for (let box of selectedBoxes) {
        if (box.classList.contains('correct')) {
            correctMatches++;
        } else if (box.classList.contains('wrong')) {
            wrongMatches++;
        }
    }
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('result-container').style.display = 'block';
    document.getElementById('correct-matches').textContent = correctMatches;
    document.getElementById('wrong-matches').textContent = wrongMatches;
}

function getRemainingWords() {
    const remainingWords = [];
    const allWords = ['Pine', 'Tiger', 'Mountain', 'River', 'Cloud', 'Diamond', 'Planet', 'Star', 'Rainbow', 'Sun'];
    for (let word of allWords) {
        if (!correctWords.includes(word)) {
            remainingWords.push(word);
        }
    }
    return remainingWords;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
