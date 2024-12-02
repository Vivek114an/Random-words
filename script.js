let words = [];
let history = [];

function drawRandomWord() {
    const inputBox = document.getElementById('wordInput');
    words = inputBox.value.split('\n').map(word => word.trim()).filter(Boolean);
    
    if (words.length === 0) {
        alert('Please enter words in the input box!');
        return;
    }

    const randomIndex = Math.floor(Math.random() * words.length);
    const drawnWord = words.splice(randomIndex, 1)[0];
    
    history.push(drawnWord);
    updateWordInput();
    addToHistoryBox(drawnWord);
    updateWordCount();
    updateHistoryCount();
}

function updateWordInput() {
    document.getElementById('wordInput').value = words.join('\n');
}

function updateWordCount() {
    document.getElementById('wordCount').innerText = `Words: ${words.length}`;
}

function updateHistoryCount() {
    document.getElementById('historyCount').innerText = `History Words: ${history.length}`;
}

function addToHistoryBox(word) {
    const historyBox = document.getElementById('historyBox');
    const wordItem = document.createElement('div');
    wordItem.className = 'word-item';
    wordItem.innerHTML = `
        <span>${word}</span>
        <div>
            <button onclick="searchWord('${word}')">🔍</button>
            <button onclick="removeWord('${word}')">❌</button>
        </div>
    `;
    historyBox.appendChild(wordItem);
}

function searchWord(word) {
    window.open(`https://www.google.com/search?q=${word} meaning`, '_blank');
}

function removeWord(word) {
    history = history.filter(item => item !== word);
    updateHistoryBox();
    updateHistoryCount();
}

function updateHistoryBox() {
    const historyBox = document.getElementById('historyBox');
    historyBox.innerHTML = '';
    history.forEach(word => addToHistoryBox(word));
}

function toggleDarkLight() {
    document.body.classList.toggle('dark-mode');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}
