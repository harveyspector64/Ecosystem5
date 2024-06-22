class Game {
    constructor() {
        this.gameState = {
            entities: [],
            selectedEmoji: null,
            timeOfDay: 'day',
        };
        this.ui = new UI(this);
        this.ecosystem = new Ecosystem(this);
        this.timeSystem = new TimeSystem(this);
    }

    init() {
        this.ui.createEmojiPanel();
        this.ui.setupEventListeners();
        this.startGameLoop();
    }

    startGameLoop() {
        const gameLoop = () => {
            this.update();
            this.render();
            requestAnimationFrame(gameLoop);
        };
        gameLoop();
    }

    update() {
        this.timeSystem.update();
        this.ecosystem.update();
        this.gameState.entities.forEach(entity => entity.update());
    }

    render() {
        this.ui.render();
        this.gameState.entities.forEach(entity => entity.render());
    }

    addEntity(EntityClass, x, y) {
        const entity = new EntityClass(this, x, y);
        this.gameState.entities.push(entity);
        this.ecosystem.onEntityAdded(entity);
        return entity;
    }

    removeEntity(entity) {
        const index = this.gameState.entities.indexOf(entity);
        if (index !== -1) {
            this.gameState.entities.splice(index, 1);
            this.ecosystem.onEntityRemoved(entity);
            entity.element.remove();
        }
    }
}

const game = new Game();
game.init();
