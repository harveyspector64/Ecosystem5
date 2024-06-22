class UI {
    constructor(game) {
        this.game = game;
        this.emojiPanel = document.getElementById('emoji-panel');
        this.gameMap = document.getElementById('game-map');
        this.newsFeed = document.getElementById('news-feed');
        this.newsItems = [];
    }

    createEmojiPanel() {
        const emojis = [
            { type: FloweringBush, emoji: '🌳' },
            { type: Tree, emoji: '🌲' },
            { type: Worm, emoji: '🐛' }
        ];

        emojis.forEach(item => {
            const emojiElement = document.createElement('div');
            emojiElement.className = 'emoji-item';
            emojiElement.textContent = item.emoji;
            emojiElement.dataset.type = item.type.name;
            this.emojiPanel.appendChild(emojiElement);
        });
    }

    setupEventListeners() {
        this.emojiPanel.addEventListener('click', this.handleEmojiSelection.bind(this));
        this.gameMap.addEventListener('click', this.handleMapClick.bind(this));
    }

    handleEmojiSelection(event) {
        if (event.target.classList.contains('emoji-item')) {
            this.game.gameState.selectedEmoji = event.target.dataset.type;
        }
    }

    handleMapClick(event) {
        if (this.game.gameState.selectedEmoji) {
            const rect = event.target.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const EntityClass = eval(this.game.gameState.selectedEmoji);
            this.game.addEntity(EntityClass, x, y);
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
    }

    render() {
        // Update game map background based on time of day
        this.gameMap.style.backgroundColor = this.game.gameState.timeOfDay === 'day' ? '#ffffff' : '#333333';
    }
}
