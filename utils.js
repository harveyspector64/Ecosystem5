// Utility functions for the Emoji Ecosystem Simulator

// Debug logging function
function debug(message) {
    console.log(`[DEBUG] ${message}`);
}

// Calculate distance between two points
function distanceBetween(entity1, entity2) {
    return Math.sqrt(Math.pow(entity1.x - entity2.x, 2) + Math.pow(entity1.y - entity2.y, 2));
}

// Generate a random number between min and max (inclusive)
function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

debug("utils.js loaded successfully");
