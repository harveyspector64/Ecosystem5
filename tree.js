class Tree extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 'tree', '🌲');
        this.birds = [];
        this.eggs = [];
    }

    update() {
        this.eggs = this.eggs.filter(egg => !egg.hatched);
        if (Math.random() < 0.005 && this.birds.length < 3) {
            this.spawnBird();
        }
    }

    spawnBird() {
        const bird = this.game.addEntity(Bird, this.x, this.y);
        this.birds.push(bird);
    }

    addEgg() {
        const egg = { hatchTime: Date.now() + 10000, hatched: false };
        this.eggs.push(egg);
        setTimeout(() => {
            egg.hatched = true;
            this.spawnBird();
        }, 10000);
    }

    removeBird(bird) {
        const index = this.birds.indexOf(bird);
        if (index !== -1) {
            this.birds.splice(index, 1);
        }
    }
}
