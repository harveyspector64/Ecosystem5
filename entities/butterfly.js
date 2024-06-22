class Butterfly extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 'butterfly', '🦋');
        this.speed = 1;
        this.hunger = 100;
        this.target = null;
    }

    update() {
        this.hunger -= 0.1;
        if (this.hunger <= 0) {
            this.remove();
            return;
        }

        if (this.hunger < 50 && !this.target) {
            this.findNearestFloweringBush();
        }

        if (this.target) {
            this.moveTowardsTarget();
        } else {
            this.flutter();
        }
    }

    findNearestFloweringBush() {
        const bushes = this.game.gameState.entities.filter(e => e instanceof FloweringBush);
        if (bushes.length > 0) {
            this.target = bushes.reduce((nearest, bush) => {
                const distToNearest = distanceBetween(this, nearest);
                const distToBush = distanceBetween(this, bush);
                return distToBush < distToNearest ? bush : nearest;
            });
        }
    }

    moveTowardsTarget() {
        const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        if (distanceBetween(this, this.target) < 5) {
            this.hunger = 100;
            this.target = null;
        }
    }

    flutter() {
        this.x += (Math.random() - 0.5) * this.speed;
        this.y += (Math.random() - 0.5) * this.speed;
    }
}
