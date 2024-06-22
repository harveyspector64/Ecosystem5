class Worm extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 'worm', '🐛');
        this.speed = 0.2;
        this.moveInterval = null;
        this.startMoving();
        debug("Worm created");
    }

    startMoving() {
        this.moveInterval = setInterval(() => {
            this.move();
        }, 1000);
    }

    move() {
        const angle = Math.random() * Math.PI * 2;
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        // Keep the worm within the game map
        this.x = Math.max(0, Math.min(this.x, this.game.ui.gameMap.clientWidth));
        this.y = Math.max(0, Math.min(this.y, this.game.ui.gameMap.clientHeight));
    }

    remove() {
        clearInterval(this.moveInterval);
        super.remove();
    }
}
