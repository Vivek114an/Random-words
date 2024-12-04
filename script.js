
const mainWords = document.getElementById("mainWords");
const mainWordCount = document.getElementById("mainWordCount");
const drawnWords = document.getElementById("drawnWords");
const historyWords = document.getElementById("historyWords");
const historyWordCount = document.getElementById("historyWordCount");
const drawCount = document.getElementById("drawCount");
const copyHistoryBtn = document.getElementById("copyHistoryBtn");

let currentDrawnWords = [];

// Update word count
function updateWordCount() {
    mainWordCount.textContent = "Words: " + mainWords.value.split("\n").filter(word => word.trim() !== "").length;
    historyWordCount.textContent = "History Words: " + historyWords.value.split("\n").filter(word => word.trim() !== "").length;
}

// Draw random words
function drawRandomWords() {
    let words = mainWords.value.split("\n").filter(word => word.trim() !== "");
    const numWordsToDraw = Math.min(parseInt(drawCount.value), words.length);
    
    if (numWordsToDraw === 0) {
        alert("No words available to draw.");
        return;
    }

    drawnWords.innerHTML = "";
    currentDrawnWords = [];
    
    for (let i = 0; i < numWordsToDraw; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const word = words.splice(randomIndex, 1)[0];
        currentDrawnWords.push(word);

        const wordDiv = document.createElement("div");
        wordDiv.className = "drawn-item";
        
        const wordSpan = document.createElement("span");
        wordSpan.textContent = word;
        wordDiv.appendChild(wordSpan);

        const searchBtn = document.createElement("button");
        searchBtn.className = "search-btn";
        searchBtn.textContent = "ðŸ”";
        searchBtn.onclick = () => searchWordMeaning(word);
        wordDiv.appendChild(searchBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "X";
        deleteBtn.onclick = () => deleteDrawnWord(word, wordDiv);
        wordDiv.appendChild(deleteBtn);

        drawnWords.appendChild(wordDiv);
    }
    
    mainWords.value = words.join("\n");
    updateWordCount();
}

// Delete drawn word from the Drawn Words box without adding to history
function deleteDrawnWord(word, wordDiv) {
    drawnWords.removeChild(wordDiv);
    currentDrawnWords = currentDrawnWords.filter(w => w !== word);
}

// Move remaining drawn words to history
function saveToHistory() {
    if (currentDrawnWords.length > 0) {
        historyWords.value += currentDrawnWords.join("\n") + "\n";
        currentDrawnWords = [];
        updateWordCount();
    }
}

// Draw new words and save remaining to history
function drawAndSave() {
    saveToHistory();
    drawRandomWords();
}

// Search word meaning on Google
function searchWordMeaning(word) {
    const query = encodeURIComponent(`${word} meaning`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
}

// Copy all history words to clipboard
function copyHistory() {
    const historyText = historyWords.value;

    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(historyText)
            .then(() => alert("History copied to clipboard!"))
            .catch(err => alert("Failed to copy history: " + err));
    } else {
        const textArea = document.createElement("textarea");
        textArea.value = historyText;
        textArea.style.position = "fixed";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            alert("History copied to clipboard!");
        } catch (err) {
            alert("Unable to copy: " + err);
        }
        document.body.removeChild(textArea);
    }
}

// Toggle dark/light mode
function toggleMode() {
    document.body.classList.toggle("dark-mode");
    document.body.style.backgroundColor = document.body.classList.contains("dark-mode") ? "#333" : "#f0f0f0";
    document.body.style.color = document.body.classList.contains("dark-mode") ? "white" : "black";
}

// Initialize word count
mainWords.addEventListener("input", updateWordCount);
copyHistoryBtn.addEventListener("click", copyHistory);
updateWordCount();
