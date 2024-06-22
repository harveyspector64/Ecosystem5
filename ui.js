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
            { type: 'FloweringBush', emoji: '🌳' },
            { type: 'Tree', emoji: '🌲' },
            { type: 'Worm', emoji: '🐛' }
        ];

        emojis.forEach(item => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = item.emoji;
            emojiElement.dataset.type = item.type;
            this.emojiPanel.appendChild(emojiElement);
        });

        debug("Emoji panel created");
    }

    setupEventListeners() {
        this.emojiPanel.addEventListener('click', this.handleEmojiSelection.bind(this));
        this.gameMap.addEventListener('click', this.handleMapClick.bind(this));
        debug("Event listeners set up");
    }

    handleEmojiSelection(event) {
        if (event.target.classList.contains('emoji-item')) {
            this.game.gameState.selectedEmoji = event.target.dataset.type;
            debug(`Selected emoji: ${this.game.gameState.selectedEmoji}`);
        }
    }

    handleMapClick(event) {
        if (this.game.gameState.selectedEmoji) {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            this.game.addEntity(this.game.gameState.selectedEmoji, x, y);
            debug(`Added ${this.game.gameState.selectedEmoji} at (${x}, ${y})`);
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
        this.gameMap.style.backgroundColor = this.game.gameState.timeOfDay === 'day' ? '#ffffff' : '#333333';
    }

    init() {
        this.createEmojiPanel();
        this.setupEventListeners();
        this.addNewsItem("Welcome to the Emoji Ecosystem Simulator!");
        debug("UI initialized");
    }
}
