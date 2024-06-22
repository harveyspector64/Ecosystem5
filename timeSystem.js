class TimeSystem {
    constructor(game) {
        this.game = game;
        this.dayDuration = 60000; // 1 minute per day
        this.time = 0;
    }

    update() {
        this.time += 16; // Assuming 60 FPS
        if (this.time >= this.dayDuration) {
            this.time = 0;
            this.toggleDayNight();
        }
    }

    toggleDayNight() {
        this.game.gameState.timeOfDay = this.game.gameState.timeOfDay === 'day' ? 'night' : 'day';
        this.game.ui.addNewsItem(`It is now ${this.game.gameState.timeOfDay}time.`);
        
        if (this.game.gameState.timeOfDay === 'night') {
            this.handleNightTransition();
        } else {
            this.handleDayTransition();
        }
    }

    handleNightTransition() {
        // Remove daytime entities
        this.game.gameState.entities
            .filter(e => e instanceof Butterfly)
            .forEach(e => e.remove());

        // TODO: Add nighttime entities (e.g., owls, moths)
    }

    handleDayTransition() {
        // Remove nighttime entities
        // TODO: Remove nighttime entities when implemented

        // Respawn some butterflies
        const floweringBushes = this.game.gameState.entities.filter(e => e instanceof FloweringBush);
        floweringBushes.forEach(bush => {
            if (Math.random() < 0.5) {
                bush.spawnButterfly();
            }
        });
    }
}
