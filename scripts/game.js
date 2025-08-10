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
 * Handles the game over sequence by stopping the game, updating the UI,
 * and displaying the game over animation and final screen in timed steps.
 *
 * Sequence:
 * - Stops the game logic
 * - Hides the game header and shows the game over screen
 * - Displays the game over logo after a short delay
 * - Calls `showGameOver()` to trigger further animations or logic
 * - Replaces the logo with the game over body after a delay
 * - Clears the game over text content
 */
function gameOver() {
    stopGame();
    audioManager.playGameOverSound();
    showGameOverScreen();
    scheduleGameOverSequence();
}


/**
 * Stops the game by clearing all running intervals and halting the drawing loop.
 * This effectively freezes the game world and pauses all activity.
 */
function stopGame() {
    world.clearAllIntervals();
    world.stopDrawing();
    document.getElementById('mobile_buttons').classList.add('d_none');
}


/**
 * Displays the game over screen by removing its hidden class
 * and hides the header to focus attention on the game over UI.
 */
function showGameOverScreen() {
    document.getElementById('game_over_screen').classList.remove('d_none');
}


/**
 * Schedules the sequence of actions to show the game over animation
 * and buttons using timeouts.
 *
 * Sequence:
 * - Shows the game over logo after 10ms
 * - Calls `showGameOver()` after 1 second
 * - Displays the game over buttons after 4.5 seconds
 */
function scheduleGameOverSequence() {
    animateGameOverLogo()
    if (window.innerWidth <= 1400 || document.fullscreenElement) {
        animateGameOverLogoResponsiv();
    }
    showGameOver();
    showGameOverResponsiv();
    showGameOverButtons()
}


/**
 * Animates the game over logo by clearing the text and showing the header element with a slight delay.
 */
function animateGameOverLogo() {
    document.getElementById('logo_text').innerHTML = '';
    setTimeout(() => {
        document.getElementById('header').classList.add('show');
    }, 10);
}


/**
 * Animates the responsive game over logo by clearing the text and showing the responsive logo element with a slight delay.
 */
function animateGameOverLogoResponsiv() {
    document.getElementById('game_over_text').innerHTML = '';
    setTimeout(() => {
        document.getElementById('game_over_logo_responsiv').classList.add('show_responsiv');
    }, 10);
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
 * Finalizes the game over sequence by hiding the logo,
 * clearing the game over text, and displaying the action buttons.
 */
function showGameOverButtons() {
    setTimeout(() => {
        document.getElementById('game_over_logo_responsiv').classList.remove('show_responsiv');
        document.getElementById('game_over_logo_responsiv').classList.add('d_none');
        document.getElementById('header').classList.add('d_none');
        document.getElementById('logo_text').innerHTML = 'Happy Hollow';
        document.getElementById('header').classList.remove('show');
        document.getElementById('game_over_body').classList.remove('d_none');
    }, 4500);
}


/**
 * Handles the full win sequence: stops the game, updates the UI,
 * starts logo animation, schedules follow-up events, and resets animation state.
 */
function gameWin() {
    stopGame();
    audioManager.playGameWinSound();
    showWinScreen();
    scheduleWinSequence();
    resetGameWinAnimation();
}


/**
 * Displays the win screen and hides the game header to focus on the win UI.
 */
function showWinScreen() {
    document.getElementById('win_screen').classList.remove('d_none');
}


/**
 * Starts the win logo animation shortly after showing the win screen.
 */
function animateWinLogo() {
    document.getElementById('logo_text').innerHTML = '';
    setTimeout(() => {
        document.getElementById('header').classList.add('show');
    }, 10);
}


/**
 * Starts the responsiv win logo animation shortly after showing the win screen.
 */
function animateWinLogoResponsiv() {
    document.getElementById('you_win_text').innerHTML = '';
    setTimeout(() => {
        document.getElementById('win_logo_responsiv').classList.add('show_responsiv');
    }, 10);
}


/**
 * Schedules the sequence of events after winning:
 * - Shows the "You Win" text after 1 second
 * - Fades out the win screen after 4.5 seconds
 * - Transitions to the start screen and fades it in after 5.5 seconds
 */
function scheduleWinSequence() {
    animateWinLogo();
    if (window.innerWidth <= 1400 || document.fullscreenElement) {
        animateWinLogoResponsiv();
    }
    showYouWin();
    showYouWinResponsiv();
    fadeOutWinScreen();
    showStartScreen();
    fadeInWinScreen();
}


/**
 * Resets the win screen animation state by:
 * - Removing the white fade-out effect
 * - Hiding the win logo
 * - Clearing the "You Win" text
 *
 * This prepares the win screen for future re-use or replay.
 */
function resetGameWinAnimation() {
    setTimeout(() => {
        document.getElementById('header').classList.add('d_none');
        document.getElementById('win_logo_responsiv').classList.remove('show_responsiv');
        document.getElementById('logo_text').innerHTML = 'Happy Hollow';
        document.getElementById('header').classList.remove('show');
        document.getElementById('win_fade_overlay').classList.remove('fade-out-white');
    }, 5500);
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