let inputWords = document.getElementById('inputWords');
let wordCount = document.getElementById('wordCount');
let drawnWordsList = document.getElementById('drawnWordsList');
let drawnCount = document.getElementById('drawnCount');
let historyList = document.getElementById('historyList');
let historyCount = document.getElementById('historyCount');
let drawWordBtn = document.getElementById('drawWordBtn');
let fullScreenBtn = document.getElementById('fullScreenBtn');
let toggleThemeBtn = document.getElementById('toggleThemeBtn');

let drawnWords = [];
let historyWords = [];
let wordList = [];

function updateWordCount() {
    wordList = inputWords.value.trim().split('\n').filter(word => word.trim() !== '');
    wordCount.innerText = wordList.length;
}

function drawWord() {
    if (wordList.length > 0) {
        let randomIndex = Math.floor(Math.random() * wordList.length);
        let word = wordList[randomIndex];
        drawnWords.push(word);
        wordList.splice(randomIndex, 1);
        updateUI();
    }
}

function updateUI() {
    drawnWordsList.innerHTML = drawnWords.map(word => `
        <li>
            <span>${word}</span>
            <button onclick="searchWord('${word}')">🔍</button>
            <button onclick="removeWord('${word}')">❌</button>
        </li>
    `).join('');
    
    historyList.innerHTML = historyWords.map(word => `
        <li class="dull">
            <span>${word}</span>
        </li>
    `).join('');
    
    drawnCount.innerText = drawnWords.length;
    historyCount.innerText = historyWords.length;
    wordCount.innerText = wordList.length;
}

function searchWord(word) {
    let searchUrl = `https://www.google.com/search?q=${word}+meaning`;
    window.open(searchUrl, '_blank');
}

function removeWord(word) {
    drawnWords = drawnWords.filter(w => w !== word);
    historyWords.push(word);
    updateUI();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// Event Listeners
inputWords.addEventListener('input', updateWordCount);
drawWordBtn.addEventListener('click', drawWord);
toggleThemeBtn.addEventListener('click', toggleTheme);
fullScreenBtn.addEventListener('click', toggleFullScreen);

// Initial UI Setup
updateWordCount();
