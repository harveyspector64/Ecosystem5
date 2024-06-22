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
        debug("Game constructor called");
    }

    init() {
        this.ui.init();
        this.startGameLoop();
        debug("Game initialized");
    }

    startGameLoop() {
        debug("Game loop started");
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

    addEntity(entityType, x, y) {
        let entity;
        switch (entityType) {
            case 'FloweringBush':
                entity = new FloweringBush(this, x, y);
                break;
            case 'Tree':
                entity = new Tree(this, x, y);
                break;
            case 'Worm':
                entity = new Worm(this, x, y);
                break;
            default:
                debug(`Unknown entity type: ${entityType}`);
                return;
        }
        this.gameState.entities.push(entity);
        this.ecosystem.onEntityAdded(entity);
        debug(`Entity added: ${entityType} at (${x}, ${y})`);
        return entity;
    }

    removeEntity(entity) {
        const index = this.gameState.entities.indexOf(entity);
        if (index !== -1) {
            this.gameState.entities.splice(index, 1);
            this.ecosystem.onEntityRemoved(entity);
            entity.element.remove();
            debug(`Entity removed: ${entity.type}`);
        }
    }
}

// Initialize the game
const game = new Game();
game.init();

debug("game.js loaded and game initialized");
