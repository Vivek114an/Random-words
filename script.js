
document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const drawnWordsList = document.getElementById('drawnWords');
    const historyWordsList = document.getElementById('historyWords');
    const wordCountText = document.getElementById('wordCount');
    const historyWordCountText = document.getElementById('historyWordCount');
    const drawButton = document.getElementById('drawButton');
    const copyHistoryButton = document.getElementById('copyHistoryButton');
    const toggleModeButton = document.getElementById('toggleModeButton');

    let wordsList = [];
    let drawnWords = [];
    let historyWords = [];
    let darkMode = false;

    drawButton.addEventListener('click', drawRandomWords);
    copyHistoryButton.addEventListener('click', copyHistoryToClipboard);
    toggleModeButton.addEventListener('click', toggleDarkMode);

    function drawRandomWords() {
        const input = wordInput.value.trim();
        if (input === '') {
            alert('Please paste words into the input box.');
            return;
        }

        wordsList = input.split('\n').map(word => word.trim()).filter(word => word.length > 0);

        if (wordsList.length === 0) {
            alert('No valid words to draw.');
            return;
        }

        const numberOfWords = 3; // Change this number as needed
        drawnWords = [];

        for (let i = 0; i < numberOfWords && wordsList.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * wordsList.length);
            drawnWords.push(wordsList.splice(randomIndex, 1)[0]);
        }

        updateDrawnWords();
        updateWordCount();
        saveToHistory(drawnWords);
    }

    function updateDrawnWords() {
        drawnWordsList.innerHTML = '';
        drawnWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.addEventListener('click', () => {
                drawnWords = drawnWords.filter(w => w !== word);
                updateDrawnWords();
                updateWordCount();
            });
            li.appendChild(deleteButton);
            drawnWordsList.appendChild(li);
        });
    }

    function saveToHistory(words) {
        historyWords = historyWords.concat(words);
        updateHistoryWords();
        updateHistoryWordCount();
    }

    function updateHistoryWords() {
        historyWordsList.innerHTML = '';
        historyWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            historyWordsList.appendChild(li);
        });
    }

    function updateWordCount() {
        wordCountText.textContent = `Word Count: ${wordsList.length}`;
    }

    function updateHistoryWordCount() {
        historyWordCountText.textContent = `History Word Count: ${historyWords.length}`;
    }

    function copyHistoryToClipboard() {
        const historyText = historyWords.join('\n');
        navigator.clipboard.writeText(historyText).then(() => {
            alert('History copied to clipboard!');
        });
    }

    function toggleDarkMode() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode', darkMode);
    }
});
