class Ecosystem {
    constructor(game) {
        this.game = game;
    }

    update() {
        this.manageButterflyPopulation();
        this.manageBirdPopulation();
        this.manageWormPopulation();
    }

    manageButterflyPopulation() {
        const floweringBushes = this.game.gameState.entities.filter(e => e instanceof FloweringBush);
        const butterflies = this.game.gameState.entities.filter(e => e instanceof Butterfly);

        if (butterflies.length < floweringBushes.length * 2 && Math.random() < 0.05) {
            const bush = floweringBushes[Math.floor(Math.random() * floweringBushes.length)];
            bush.spawnButterfly();
        }
    }

    manageBirdPopulation() {
        const trees = this.game.gameState.entities.filter(e => e instanceof Tree);
        const birds = this.game.gameState.entities.filter(e => e instanceof Bird);

        if (birds.length < trees.length * 2 && Math.random() < 0.02) {
            const tree = trees[Math.floor(Math.random() * trees.length)];
            tree.spawnBird();
        }
    }

    manageWormPopulation() {
        const worms = this.game.gameState.entities.filter(e => e instanceof Worm);

        if (worms.length < 10 && Math.random() < 0.1) {
            const x = Math.random() * this.game.ui.gameMap.clientWidth;
            const y = Math.random() * this.game.ui.gameMap.clientHeight;
            this.game.addEntity(Worm, x, y);
        }
    }

    onEntityAdded(entity) {
        if (entity instanceof FloweringBush) {
            this.game.ui.addNewsItem("A new flowering bush has been planted!");
        } else if (entity instanceof Tree) {
            this.game.ui.addNewsItem("A new tree has been planted!");
        }
    }

    onEntityRemoved(entity) {
        if (entity instanceof Butterfly) {
            this.game.ui.addNewsItem("A butterfly has disappeared from the ecosystem.");
        } else if (entity instanceof Bird) {
            this.game.ui.addNewsItem("A bird has left the ecosystem.");
        }
    }
}
