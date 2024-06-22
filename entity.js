class Entity {
    constructor(game, x, y, type, emoji) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.type = type;
        this.emoji = emoji;
        this.element = document.createElement('div');
        this.element.className = 'entity';
        this.element.textContent = emoji;
        this.updatePosition();
        this.game.ui.gameMap.appendChild(this.element);
    }

    update() {
        // To be overridden by subclasses
    }

    render() {
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    remove() {
        this.game.removeEntity(this);
    }
}
