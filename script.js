document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const drawnWordsList = document.getElementById('drawnWords');
    const historyWordsTextArea = document.getElementById('historyWords');
    const wordCountText = document.getElementById('wordCount');
    const drawnWordCountText = document.getElementById('drawnWordCount');
    const historyWordCountText = document.getElementById('historyWordCount');
    const drawButton = document.getElementById('drawButton');
    const copyHistoryButton = document.getElementById('copyHistoryButton');
    const toggleModeButton = document.getElementById('toggleModeButton');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');
    const closePopup = document.getElementById('closePopup');

    let wordsList = [];
    let drawnWords = [];
    let historyWords = [];
    let darkMode = false;

    drawButton.addEventListener('click', drawRandomWords);
    copyHistoryButton.addEventListener('click', copyHistoryToClipboard);
    toggleModeButton.addEventListener('click', toggleDarkMode);
    closePopup.addEventListener('click', () => popup.style.display = 'none');

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
    }

    function updateDrawnWords() {
        drawnWordsList.innerHTML = '';
        drawnWords.forEach(word => {
            const li = document.createElement('li');
            li.textContent = word;
            const searchButton = document.createElement('button');
            searchButton.textContent = '🔍';
            searchButton.addEventListener('click', () => {
                window.open(`https://www.google.com/search?q=${word}`, '_blank');
            });
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.addEventListener('click', () => {
                drawnWords = drawnWords.filter(w => w !== word);
                updateDrawnWords();
                updateWordCount();
            });
            li.appendChild(searchButton);
            li.appendChild(deleteButton);
            drawnWordsList.appendChild(li);
        });

        drawnWordCountText.textContent = `Drawn Word Count: ${drawnWords.length}`;
    }

    function saveToHistory(words) {
        historyWords = historyWords.concat(words);
        updateHistoryWords();
        updateHistoryWordCount();
    }

    function updateHistoryWords() {
        historyWordsTextArea.value = history
