class Bird extends Entity {
    constructor(game, x, y) {
        super(game, x, y, 'bird', '🐦');
        this.speed = 2;
        this.hunger = 100;
        this.state = 'flying';
        this.target = null;
        this.foodPoints = 0;
    }

    update() {
        this.hunger -= 0.05;
        if (this.hunger <= 0) {
            this.remove();
            return;
        }

        switch (this.state) {
            case 'flying':
                this.fly();
                break;
            case 'hunting':
                this.hunt();
                break;
            case 'roosting':
                this.roost();
                break;
        }

        if (this.foodPoints >= 200) {
            this.layEgg();
        }
    }

    fly() {
        this.x += (Math.random() - 0.5) * this.speed;
        this.y += (Math.random() - 0.5) * this.speed;

        if (Math.random() < 0.01) {
            if (this.hunger < 60) {
                this.state = 'hunting';
            } else {
                this.state = 'roosting';
            }
        }
    }

    hunt() {
        if (!this.target) {
            this.findNearestWorm();
        }

        if (this.target) {
            this.moveTowardsTarget();
        } else {
            this.state = 'flying';
        }
    }

    roost() {
        if (!this.target) {
            this.findNearestTree();
        }

        if (this.target) {
            this.moveTowardsTarget();
        } else {
            this.state = 'flying';
        }

        if (Math.random() < 0.01) {
            this.state = 'flying';
        }
    }

    findNearestWorm() {
        const worms = this.game.gameState.entities.filter(e => e instanceof Worm);
        if (worms.length > 0) {
            this.target = worms.reduce((nearest, worm) => {
                const distToNearest = distanceBetween(this, nearest);
                const distToWorm = distanceBetween(this, worm);
                return distToWorm < distToNearest ? worm : nearest;
            });
        }
    }

    findNearestTree() {
        const trees = this.game.gameState.entities.filter(e => e instanceof Tree);
        if (trees.length > 0) {
            this.target = trees.reduce((nearest, tree) => {
                const distToNearest = distanceBetween(this, nearest);
                const distToTree = distanceBetween(this, tree);
                return distToTree < distToNearest ? tree : nearest;
            });
        }
    }

    moveTowardsTarget() {
        const angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;

        if (distanceBetween(this, this.target) < 5) {
            if (this.target instanceof Worm) {
                this.eatWorm(this.target);
            } else if (this.target instanceof Tree) {
                this.perchOnTree(this.target);
            }
            this.target = null;
        }
    }

    eatWorm(worm) {
        this.hunger += 30;
        this.foodPoints += 30;
        worm.remove();
    }

    perchOnTree(tree) {
        this.x = tree.x;
        this.y = tree.y - 20; // Adjust this value to position the bird on the tree
        this.state = 'roosting';
        tree.birds.push(this);
        setTimeout(() => {
            if (this.state === 'roosting') {
                this.state = 'flying';
                const index = tree.birds.indexOf(this);
                if (index !== -1) {
                    tree.birds.splice(index, 1);
                }
            }
        }, 5000 + Math.random() * 5000); // Random roosting time between 5-10 seconds
    }

    layEgg() {
        const nearestTree = this.game.gameState.entities.find(e => e instanceof Tree);
        if (nearestTree) {
            nearestTree.addEgg();
            this.foodPoints = 0;
            this.game.ui.addNewsItem("A bird has laid an egg!");
        }
    }

    render() {
        super.render();
        this.element.textContent = this.state === 'flying' ? '🐦' : '🐥';
    }
}
