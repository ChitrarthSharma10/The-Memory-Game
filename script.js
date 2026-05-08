const grid = document.getElementById('grid');
const moveDisplay = document.getElementById('moves');
const resetBtn = document.getElementById('reset-btn');

let cards = [];
let flippedCards = [];
let moves = 0;
let lockBoard = false;

// 1. Define icons (8 pairs = 16 cards)
const icons = ['🔥', '👾', '🚀', '⚡', '🌈', '💎', '🍀', '🍎'];
const gameIcons = [...icons, ...icons];

// 2. Initialize Game
function initGame() {
    grid.innerHTML = '';

    moves = 0;
    moveDisplay.innerText = moves;
    flippedCards = [];
    lockBoard = false;

    // Shuffle icons
    gameIcons.sort(() => Math.random() - 0.5);

    // Create cards
    gameIcons.forEach((icon) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-front"></div>
            <div class="card-back">${icon}</div>
        `;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// 3. Flip Logic
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return; // Can't click same card twice
    console.log('Card clicked:', this);

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        moveDisplay.innerText = moves;
        checkMatch();
    }
}

// 4. Match Checking
function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.innerHTML === card2.innerHTML;

    if (isMatch) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            resetBoard();
        }, 1000);
    }
}

function resetBoard() {
    flippedCards = [];
    lockBoard = false;
}

resetBtn.addEventListener('click', initGame);

// Start on load
initGame();