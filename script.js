// API endpoints
const API_ENDPOINTS = {
    general: 'https://official-joke-api.appspot.com/random_joke',
    programming: 'https://official-joke-api.appspot.com/jokes/programming/random',
    knockKnock: 'https://official-joke-api.appspot.com/jokes/knock-knock/random'
};

// State management
let jokeHistory = [];
let favorites = [];
let currentJoke = null;

// DOM elements
const jokeText = document.getElementById('jokeText');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const favoriteBtn = document.getElementById('favoriteBtn');
const categorySelect = document.getElementById('categorySelect');
const historyList = document.getElementById('historyList');
const favoritesList = document.getElementById('favoritesList');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Load data from localStorage
function loadData() {
    const savedHistory = localStorage.getItem('jokeHistory');
    const savedFavorites = localStorage.getItem('favorites');
    
    if (savedHistory) jokeHistory = JSON.parse(savedHistory);
    if (savedFavorites) favorites = JSON.parse(savedFavorites);
    
    updateHistoryDisplay();
    updateFavoritesDisplay();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('jokeHistory', JSON.stringify(jokeHistory));
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Fetch joke from API
async function fetchJoke() {
    const category = categorySelect.value;
    let endpoint;

    if (category === 'any') {
        const categories = ['general', 'programming', 'knock-knock'];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        endpoint = API_ENDPOINTS[randomCategory === 'knock-knock' ? 'knockKnock' : randomCategory];
    } else if (category === 'knock-knock') {
        endpoint = API_ENDPOINTS.knockKnock;
    } else {
        endpoint = API_ENDPOINTS[category];
    }

    try {
        generateBtn.textContent = 'Loading...';
        generateBtn.disabled = true;

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch joke');

        const data = await response.json();
        
        // Format joke text
        let jokeContent;
        if (data.setup && data.punchline) {
            jokeContent = `${data.setup}\n\n${data.punchline}`;
        } else if (data.joke) {
            jokeContent = data.joke;
        } else {
            jokeContent = 'Could not load joke. Try again!';
        }

        currentJoke = jokeContent;
        jokeText.textContent = jokeContent;

        // Add to history
        addToHistory(jokeContent);
        updateFavoriteButton();
    } catch (error) {
        jokeText.textContent = '❌ Error loading joke. Please try again!';
        console.error('Error:', error);
    } finally {
        generateBtn.textContent = 'Get a Joke';
        generateBtn.disabled = false;
    }
}

// Add joke to history
function addToHistory(joke) {
    const timestamp = new Date().toLocaleTimeString();
    jokeHistory.unshift({ joke, timestamp });
    
    // Keep only last 50 jokes
    if (jokeHistory.length > 50) {
        jokeHistory.pop();
    }
    
    saveData();
    updateHistoryDisplay();
}

// Update history display
function updateHistoryDisplay() {
    if (jokeHistory.length === 0) {
        historyList.innerHTML = '<p class="empty-message">No joke history yet</p>';
        return;
    }

    historyList.innerHTML = jokeHistory.map((item, index) => `
        <li>
            <div>
                <strong>${item.timestamp}</strong>
                <p>${item.joke.substring(0, 50)}...</p>
            </div>
            <button onclick="removeFromHistory(${index})">Delete</button>
        </li>
    `).join('');
}

// Remove from history
function removeFromHistory(index) {
    jokeHistory.splice(index, 1);
    saveData();
    updateHistoryDisplay();
}

// Add to favorites
function addToFavorites() {
    if (!currentJoke) {
        alert('Please get a joke first!');
        return;
    }

    if (favorites.some(fav => fav.joke === currentJoke)) {
        removeFavorite(currentJoke);
        return;
    }

    favorites.unshift({ joke: currentJoke, addedAt: new Date().toLocaleDateString() });
    saveData();
    updateFavoritesDisplay();
    updateFavoriteButton();
}

// Remove from favorites
function removeFavorite(joke) {
    favorites = favorites.filter(fav => fav.joke !== joke);
    saveData();
    updateFavoritesDisplay();
    updateFavoriteButton();
}

// Update favorites display
function updateFavoritesDisplay() {
    if (favorites.length === 0) {
        favoritesList.innerHTML = '<p class="empty-message">No favorite jokes yet</p>';
        return;
    }

    favoritesList.innerHTML = favorites.map(item => `
        <li>
            <div>
                <strong>${item.addedAt}</strong>
                <p>${item.joke.substring(0, 50)}...</p>
            </div>
            <button onclick="removeFavorite('${item.joke.replace(/'/g, "\\'")}')">Delete</button>
        </li>
    `).join('');
}

// Update favorite button state
function updateFavoriteButton() {
    if (currentJoke && favorites.some(fav => fav.joke === currentJoke)) {
        favoriteBtn.textContent = '💔 Remove from Favorites';
        favoriteBtn.style.background = '#e74c3c';
    } else {
        favoriteBtn.textContent = '❤️ Add to Favorites';
        favoriteBtn.style.background = '';
    }
}

// Copy joke to clipboard
function copyToClipboard() {
    if (!currentJoke) {
        alert('Please get a joke first!');
        return;
    }

    navigator.clipboard.writeText(currentJoke).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied!';
        setTimeout(() => {
            copyBtn.textContent = originalText;
        }, 2000);
    }).catch(() => {
        alert('Failed to copy joke');
    });
}

// Tab switching
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabName + 'Tab').classList.add('active');
    });
});

// Event listeners
generatBtn.addEventListener('click', fetchJoke);
copyBtn.addEventListener('click', copyToClipboard);
favoriteBtn.addEventListener('click', addToFavorites);

// Load data on page load
window.addEventListener('load', () => {
    loadData();
    // Automatically load a joke on page load
    fetchJoke();
});