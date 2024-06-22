class UI {
    constructor(game) {
        this.game = game;
        this.emojiPanel = document.getElementById('emoji-panel');
        this.gameMap = document.getElementById('game-map');
        this.newsFeed = document.getElementById('news-feed');
        this.newsItems = [];
        debug("UI constructor called");
    }

    createEmojiPanel() {
        const emojis = [
            { type: 'FloweringBush', emoji: '🌺' },
            { type: 'Tree', emoji: '🌲' }
        ];

        emojis.forEach(item => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = item.emoji;
            emojiElement.dataset.type = item.type;
            emojiElement.draggable = true;
            this.emojiPanel.appendChild(emojiElement);
        });

        debug("Emoji panel created");
    }

    setupEventListeners() {
        this.emojiPanel.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.gameMap.addEventListener('dragover', this.handleDragOver.bind(this));
        this.gameMap.addEventListener('drop', this.handleDrop.bind(this));
        this.gameMap.addEventListener('touchmove', this.handleTouchMove.bind(this));
        this.gameMap.addEventListener('touchend', this.handleTouchEnd.bind(this));
        debug("Event listeners set up");
    }

    handleDragStart(event) {
        if (event.target.classList.contains('emoji-item')) {
            event.dataTransfer.setData('text/plain', event.target.dataset.type);
            this.game.gameState.selectedEmoji = event.target.dataset.type;
        }
    }

    handleDragOver(event) {
        event.preventDefault();
    }

    handleDrop(event) {
        event.preventDefault();
        const x = event.clientX - this.gameMap.getBoundingClientRect().left;
        const y = event.clientY - this.gameMap.getBoundingClientRect().top;
        const entityType = event.dataTransfer.getData('text');
        this.game.addEntity(entityType, x, y);
    }

    handleTouchMove(event) {
        event.preventDefault();
    }

    handleTouchEnd(event) {
        if (this.game.gameState.selectedEmoji) {
            const touch = event.changedTouches[0];
            const x = touch.clientX - this.gameMap.getBoundingClientRect().left;
            const y = touch.clientY - this.gameMap.getBoundingClientRect().top;
            this.game.addEntity(this.game.gameState.selectedEmoji, x, y);
        }
    }

    addNewsItem(message) {
        const newsItem = document.createElement('div');
        newsItem.textContent = message;
        this.newsItems.push(newsItem);
        this.newsFeed.appendChild(newsItem);

        if (this.newsItems.length > 5) {
            const oldestItem = this.newsItems.shift();
            oldestItem.remove();
        }

        debug(`News item added: ${message}`);
    }

    render() {
        // Update game map background based on time of day
        const currentTime = this.game.timeSystem.getTime();
        const opacity = Math.sin((currentTime / this.game.timeSystem.dayDuration) * Math.PI);
        this.gameMap.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }

    init() {
        this.createEmojiPanel();
        this.setupEventListeners();
        this.addNewsItem("Welcome to the Emoji Ecosystem Simulator!");
        debug("UI initialized");
    }
}
