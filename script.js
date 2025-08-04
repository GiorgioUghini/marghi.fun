class MemoryGame {
    constructor() {
        this.gameBoard = document.getElementById('gameBoard');
        this.movesElement = document.getElementById('moves');
        this.pairsElement = document.getElementById('pairs');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.victoryModal = document.getElementById('victoryModal');
        this.finalMovesElement = document.getElementById('finalMoves');
        this.playAgainBtn = document.getElementById('playAgainBtn');

        this.totalImages = 15; // IMG (1).jpg to IMG (15).jpg
        this.gridSize = 16; // 4x4 grid
        this.pairsNeeded = 8;
        
        this.gameStarted = false;
        this.moves = 0;
        this.pairsFound = 0;
        this.flippedTiles = [];
        this.matchedPairs = [];
        this.isChecking = false;

        this.initializeGame();
        this.bindEvents();
    }

    bindEvents() {
        this.newGameBtn.addEventListener('click', () => this.initializeGame());
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.playAgainBtn.addEventListener('click', () => {
            this.hideVictoryModal();
            this.initializeGame();
        });

        // Close modal when clicking outside
        this.victoryModal.addEventListener('click', (e) => {
            if (e.target === this.victoryModal) {
                this.hideVictoryModal();
            }
        });
    }

    initializeGame() {
        this.resetGame();
        this.createGameBoard();
    }

    resetGame() {
        this.gameStarted = false;
        this.moves = 0;
        this.pairsFound = 0;
        this.flippedTiles = [];
        this.matchedPairs = [];
        this.isChecking = false;
        
        this.updateStats();
        this.hideVictoryModal();
    }

    createGameBoard() {
        // Clear the game board
        this.gameBoard.innerHTML = '';

        // Get 8 unique random images
        const selectedImages = this.getRandomImages(8);
        
        // Create exactly 2 copies of each image (pairs)
        const imagePairs = [...selectedImages, ...selectedImages];
        
        // Shuffle the pairs
        const shuffledImages = this.shuffleArray(imagePairs);
        
        // Validate the game board
        if (!this.validateGameBoard(shuffledImages)) {
            console.error('Game board validation failed, regenerating...');
            this.createGameBoard(); // Regenerate if validation fails
            return;
        }

        // Create tiles
        shuffledImages.forEach((imageName, index) => {
            const tile = this.createTile(imageName, index);
            this.gameBoard.appendChild(tile);
        });
    }

    getRandomImages(count) {
        const availableImages = [];
        for (let i = 1; i <= this.totalImages; i++) {
            availableImages.push(`IMG (${i}).jpg`);
        }
        
        // Shuffle the array and take exactly 'count' unique images
        const shuffled = this.shuffleArray(availableImages);
        const selectedImages = shuffled.slice(0, count);
        
        // Debug: Log selected images to console
        console.log('Selected images for this game:', selectedImages);
        
        return selectedImages;
    }

    shuffleArray(array) {
        // Create a copy to avoid modifying the original array
        const shuffled = [...array];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        return shuffled;
    }

    validateGameBoard(images) {
        // Ensure we have exactly 16 tiles
        if (images.length !== 16) {
            console.error('Invalid board: Expected 16 tiles, got', images.length);
            return false;
        }

        // Count occurrences of each image
        const imageCount = {};
        images.forEach(img => {
            imageCount[img] = (imageCount[img] || 0) + 1;
        });

        // Check that each image appears exactly twice
        const uniqueImages = Object.keys(imageCount);
        if (uniqueImages.length !== 8) {
            console.error('Invalid board: Expected 8 unique images, got', uniqueImages.length);
            return false;
        }

        for (const img of uniqueImages) {
            if (imageCount[img] !== 2) {
                console.error(`Invalid board: Image ${img} appears ${imageCount[img]} times, expected 2`);
                return false;
            }
        }

        console.log('✅ Game board validation passed!');
        return true;
    }

    createTile(imageName, index) {
        const tile = document.createElement('div');
        tile.className = 'game-tile';
        tile.dataset.image = imageName;
        tile.dataset.index = index;

        tile.innerHTML = `
            <div class="tile-face tile-back">
                <i class="fas fa-question"></i>
            </div>
            <div class="tile-face tile-front">
                <img src="${imageName}" alt="Memory tile" loading="lazy">
            </div>
        `;

        tile.addEventListener('click', () => this.handleTileClick(tile));
        return tile;
    }

    handleTileClick(tile) {
        // Prevent clicking during checking or on already flipped/matched tiles
        if (this.isChecking || 
            tile.classList.contains('flipped') || 
            tile.classList.contains('matched') ||
            this.flippedTiles.length >= 2) {
            return;
        }

        // Start the game on first click
        if (!this.gameStarted) {
            this.gameStarted = true;
        }

        // Flip the tile
        this.flipTile(tile);
        this.flippedTiles.push(tile);

        // Check for match when two tiles are flipped
        if (this.flippedTiles.length === 2) {
            this.moves++;
            this.updateStats();
            this.checkForMatch();
        }
    }

    flipTile(tile) {
        tile.classList.add('flipped');
    }

    checkForMatch() {
        this.isChecking = true;
        const [tile1, tile2] = this.flippedTiles;
        const image1 = tile1.dataset.image;
        const image2 = tile2.dataset.image;

        setTimeout(() => {
            if (image1 === image2) {
                // Match found
                tile1.classList.add('matched');
                tile2.classList.add('matched');
                this.matchedPairs.push(tile1, tile2);
                this.pairsFound++;
                this.updateStats();

                // Check for game completion
                if (this.pairsFound === this.pairsNeeded) {
                    this.endGame();
                }
            } else {
                // No match - flip tiles back
                tile1.classList.remove('flipped');
                tile2.classList.remove('flipped');
            }

            this.flippedTiles = [];
            this.isChecking = false;
        }, 1000);
    }

    updateStats() {
        this.movesElement.textContent = this.moves;
        this.pairsElement.textContent = `${this.pairsFound}/${this.pairsNeeded}`;
    }

    endGame() {
        // Update victory modal
        this.finalMovesElement.textContent = this.moves;
        
        // Show victory modal with delay for effect
        setTimeout(() => {
            this.showVictoryModal();
        }, 500);
    }

    showVictoryModal() {
        this.victoryModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }

    hideVictoryModal() {
        this.victoryModal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});

// Add some visual feedback for loading images
document.addEventListener('DOMContentLoaded', () => {
    // Preload all images to improve performance
    const preloadImages = () => {
        for (let i = 1; i <= 15; i++) {
            const img = new Image();
            img.src = `IMG (${i}).jpg`;
        }
    };
    
    preloadImages();
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('victoryModal');
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
});
