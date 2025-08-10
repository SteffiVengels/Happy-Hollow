let canvas;
let world;
let audioManager = new AudioManager();
let fadeOverlayOpacity = 0;
let soundOn = true;
let musicOn = true;


/**
 * Loads Level 1 of the game by clearing the idle timeout, hiding the menu,
 * displaying the canvas, creating the level, initializing the world,
 * and starting the fade-in effect from white.
 */
function loadLevel1() {
    clearTimeout(idleTimeoutId);
    document.getElementById('menu_screen').classList.add('d_none');
    canvas = document.getElementById('canvas');
    canvas.classList.remove('d_none');
    audioManager.stopMenuMusicAndPlayGameStartSound();
    const level1 = createLevel1();
    world = new World(canvas, level1, audioManager);
    fadeInFromWhite();
    audioManager.playLevel1BackgroundMusic();
    document.getElementById('mobile_buttons').classList.remove('d_none');
}


/**
 * Gradually fades the screen in from white by decreasing the overlay opacity
 * in intervals until it reaches full transparency.
 */
function fadeInFromWhite() {
    fadeOverlayOpacity = 1;
    const fade = setInterval(() => {
        fadeOverlayOpacity -= 0.05;
        if (fadeOverlayOpacity <= 0) {
            fadeOverlayOpacity = 0;
            clearInterval(fade);
        }
    }, 50);
}


/**
 * Loads the Endboss level by creating a new World instance,
 * copying character stats from the previous world, setting the initial position,
 * and connecting enemies to the new world context.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element used for rendering the game.
 * @param {Object} keyboard - The keyboard input object containing key states.
 * @returns {World} The initialized World object for the Endboss level.
 */
function loadEndbossLevel(canvas) {
    const existingCharacter = world.character;
    const endbossType = determineEndbossType(existingCharacter.coinCount);
    const endbossLevel = createEndBossLevel1(existingCharacter, world, endbossType);
    const newWorld = new World(canvas, endbossLevel, audioManager);
    copyCharacterStats(existingCharacter, newWorld);
    initializeWorldPosition(newWorld);
    connectEnemiesToWorld(newWorld);
    audioManager.playEndbossLevel1BackgroundMusic();
    return newWorld;
}


/**
 * Copies key character statistics (health, energy, coins) from an existing character
 * to the character in the new world, and updates the corresponding UI bars.
 *
 * @param {Character} existingCharacter - The character from the previous world.
 * @param {World} newWorld - The new world instance with a fresh character.
 */
function copyCharacterStats(existingCharacter, newWorld) {
    newWorld.character.health = existingCharacter.health;
    newWorld.statusBar.setPercentage(newWorld.character.health);
    newWorld.character.energy = existingCharacter.energy;
    newWorld.energyBar.setPercentage(newWorld.character.energy);
    newWorld.character.coinCount = existingCharacter.coinCount;
}


/**
 * Initializes the character's starting position and camera offset in the new world.
 *
 * @param {World} newWorld - The world whose character position is being initialized.
 */
function initializeWorldPosition(newWorld) {
    newWorld.character.x = 50;
    newWorld.camera_x = 0;
}


/**
 * Connects all enemies in the new world to its character and world context,
 * allowing for interaction with the current player and environment.
 *
 * @param {World} newWorld - The world whose enemies are being connected.
 */
function connectEnemiesToWorld(newWorld) {
    newWorld.level.enemies.forEach(enemy => {
        enemy.character = newWorld.character;
        enemy.world = newWorld;
    });
}


/**
 * Bestimmt den Endboss-Typ basierend auf der Coin-Anzahl.
 * @param {number} coinCount
 * @returns {string} Endboss-Typ
 */
function determineEndbossType(coinCount) {
    if (coinCount === 35) {
        return 'Mage-Monster';
    } else if (coinCount > 32) {
        return 'Demon-Monster';
    } else if (coinCount <= 32) {
        return 'Ooze-Monster';
    }
}


/**
 * Gradually fades the canvas to white by drawing a white rectangle
 * with increasing opacity. Once fully white, the provided callback is executed.
 *
 * @param {HTMLCanvasElement} canvas - The canvas element to apply the fade-out effect on.
 * @param {Function} callback - A function to execute after the fade-out is complete.
 */
function fadeOutToWhite(canvas, callback) {
    const ctx = canvas.getContext('2d');
    let opacity = 0;
    const fade = setInterval(() => {
        opacity += 0.05;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        if (opacity >= 1) {
            clearInterval(fade);
            setTimeout(callback, 120);
        }
    }, 50);
}


/**
 * Resets the game over animation state by:
 * - Ensuring the game over logo is visible but not animated
 * - Hiding the game over body content
 *
 * This prepares the game over screen for a fresh display.
 */
function resetGameOverAnimation() {
    document.getElementById('game_over_logo_responsiv').classList.remove('d_none');
    document.getElementById('header').classList.remove('d_none');
    document.getElementById('game_over_body').classList.add('d_none');

}


/**
 * Restarts the game after a game over by:
 * - Showing the header again
 * - Hiding the game over screen
 * - Reloading Level 1
 */
function retryGame() {
    document.getElementById('header').classList.remove('d_none');
    document.getElementById('game_over_screen').classList.add('d_none');
    loadLevel1();
    resetGameOverAnimation();
}