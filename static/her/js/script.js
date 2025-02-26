
const scenes = document.querySelectorAll('.scene');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.3 });

scenes.forEach(scene => observer.observe(scene));

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇';
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 2000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Loader functionality
window.addEventListener('load', function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    const content = document.getElementById('content');

    // Simulate loading time (you can remove this setTimeout if you want it to hide immediately after load)
    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        loaderWrapper.style.visibility = 'hidden';
        content.style.opacity = '1';
    }, 2000); // Adjust time as needed
});

// Game functionality
const gameContainer = document.getElementById('game-container');
const gameBoard = document.getElementById('game-board');
const gameMessage = document.getElementById('game-message');
const closeGameBtn = document.getElementById('close-game');

const symbols = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝', '💞'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(symbol, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.addEventListener('click', flipCard);
    return card;
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        this.textContent = cards[this.dataset.index];
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (cards[card1.dataset.index] === cards[card2.dataset.index]) {
        matchedPairs++;
        if (matchedPairs === symbols.length) {
            gameMessage.textContent = "Congratulations! You've matched all the love symbols! 💖 Thanks for everything";
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }
    flippedCards = [];
}

function startGame() {
    gameBoard.innerHTML = '';
    gameMessage.textContent = '';
    matchedPairs = 0;
    flippedCards = [];
    cards = shuffleCards(cards);

    cards.forEach((symbol, index) => {
        const card = createCard(symbol, index);
        gameBoard.appendChild(card);
    });

    gameContainer.style.display = 'flex';
}

closeGameBtn.addEventListener('click', () => {
    gameContainer.style.display = 'none';
});

// Add a button to start the game
const startGameBtn = document.createElement('button');
startGameBtn.textContent = '🎮';
startGameBtn.classList.add('btn');
startGameBtn.style.position = 'fixed';
startGameBtn.style.bottom = '20px';
startGameBtn.style.left = '20px';
startGameBtn.addEventListener('click', startGame);
document.body.appendChild(startGameBtn);
