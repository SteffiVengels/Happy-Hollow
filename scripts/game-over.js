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
 * Shows the "GAME OVER!" animated text on the screen.
 */
function showGameOver() {
    setTimeout(() => {
        const gameOverText = document.getElementById('logo_text');
        animateTextByLetters(gameOverText, 'GAME OVER!', 'letter', 0.2);
    }, 1000);
}


/**
 * Shows the "GAME OVER!" animated text on the responsiv screen.
 */
function showGameOverResponsiv() {
    setTimeout(() => {
        const gameOverText = document.getElementById('game_over_text');
        animateTextByLetters(gameOverText, 'GAME OVER!', 'letter', 0.2);
    }, 1000);
}


/**
 * Animates text inside a target element by wrapping each character in a <span> with animation styles.
 *
 * @param {HTMLElement} targetElement - The DOM element to insert the animated text into.
 * @param {string} text - The text to animate.
 * @param {string} letterClass - CSS class to apply to each letter span.
 * @param {number} delayStep - Delay in seconds between each letter's animation start.
 * @param {number} [duration] - Optional animation duration in seconds for each letter.
 */
function animateTextByLetters(targetElement, text, letterClass, delayStep, duration) {
    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add(letterClass);
        span.style.animationDelay = `${i * delayStep}s`;
        if (duration !== undefined) {
            span.style.animationDuration = `${duration}s`;
        }
        targetElement.appendChild(span);
    });
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
