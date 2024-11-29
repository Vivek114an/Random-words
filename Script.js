document.getElementById('wordInput').addEventListener('input', updateWordCount);

function updateWordCount() {
    const input = document.getElementById('wordInput').value.trim();
    const words = input.split(/\s+/).filter(word => word.length > 0);
    document.getElementById('wordCount').innerText = `Word Count: ${words.length}`;
}

function drawRandomWords() {
    const input = document.getElementById('wordInput').value.trim();
    let words = input.split(/\s+/).filter(word => word.length > 0);

    if (words.length === 0) {
        alert('Please enter some words first.');
        return;
    }

    const drawCount = parseInt(document.getElementById('drawCount').value, 10);
    if (drawCount > words.length) {
        alert('Not enough words to draw.');
        return;
    }

    let drawnWords = [];
    for (let i = 0; i < drawCount; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        drawnWords.push(words.splice(randomIndex, 1)[0]);
    }

    displayDrawnWords(drawnWords);
    document.getElementById('wordInput').value = words.join(' ');
    updateWordCount();
}

function displayDrawnWords(drawnWords) {
    const drawnWordsContainer = document.getElementById('drawnWords');
    drawnWordsContainer.innerHTML = '';

    drawnWords.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.innerHTML = `
            ${word}
            <button onclick="deleteDrawnWord(this)">Delete</button>
            <button onclick="searchMeaning('${word}')">Search Meaning</button>
        `;
        drawnWordsContainer.appendChild(wordElement);
    });
}

function deleteDrawnWord(button) {
    const wordElement = button.parentNode;
    const drawnWordsContainer = document.getElementById('drawnWords');
    drawnWordsContainer.removeChild(wordElement);
}

function saveToHistory() {
    const drawnWordsContainer = document.getElementById('drawnWords');
    const historyWordsContainer = document.getElementById('historyWords');
    Array.from(drawnWordsContainer.children).forEach(wordElement => {
        const historyElement = document.createElement('div');
        historyElement.textContent = wordElement.firstChild.textContent;
        historyWordsContainer.appendChild(historyElement);
    });
    drawnWordsContainer.innerHTML = ''; // Clear drawn words after saving to history
}

function toggleMode() {
    document.body.classList.toggle('dark-mode');
}

function searchMeaning(word) {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(word)}+meaning`;
    window.open(searchUrl, '_blank');
}