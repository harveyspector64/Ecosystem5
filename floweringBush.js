class FloweringBush extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 'flowering_bush', '🌳');
        this.attractionRadius = 100;
        this.butterflies = [];
    }

    update() {
        if (Math.random() < 0.01) {
            this.spawnButterfly();
        }
    }

    spawnButterfly() {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * this.attractionRadius;
        const x = this.x + Math.cos(angle) * distance;
        const y = this.y + Math.sin(angle) * distance;
        const butterfly = this.game.addEntity(Butterfly, x, y);
        this.butterflies.push(butterfly);
    }

    removeButterfly(butterfly) {
        const index = this.butterflies.indexOf(butterfly);
        if (index !== -1) {
            this.butterflies.splice(index, 1);
        }
    }
}
