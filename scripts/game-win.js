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
 * Shows the "YOU WIN!" animated text on the screen.
 */
function showYouWin() {
    setTimeout(() => {
        const winText = document.getElementById('logo_text');
        animateTextByLetters(winText, 'YOU WIN!', 'letter-win', 0.2, 0.4);
    }, 1000);
}


/**
 * Shows the "YOU WIN!" animated text on the responsiv screen.
 */
function showYouWinResponsiv() {
    setTimeout(() => {
        const winText = document.getElementById('you_win_text');
        animateTextByLetters(winText, 'YOU WIN!', 'letter-win', 0.2, 0.4);
    }, 1000);
}


/**
 * Starts a fade-out effect on the win screen by adding a CSS class
 * that fades the overlay from transparent to white.
 */
function fadeOutWinScreen() {
    setTimeout(() => {
        document.getElementById('win_fade_overlay').classList.add('fade-in-white');
    }, 4500);
}


/**
 * Shows the start screen by adjusting visibility and animation classes of various elements.
 * Calls animateCharacter() to start the character animation on the start screen.
 */
function showStartScreen() {
    setTimeout(() => {
        resetStartScreenUI();
        animateCharacter();
    }, 5500);
}


/**
 * Resets the UI elements for the start screen:
 * - Hides win screen and canvas
 * - Shows start screen, character start, and new game button
 * - Removes animation class from the header
 */
function resetStartScreenUI() {
    document.getElementById('win_screen').classList.add('d_none');
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('start_screen').classList.remove('d_none');
    document.getElementById("character_start").classList.remove('d_none');
    document.querySelector('#start_screen header').classList.remove('animate');
    document.getElementById('new_game_button').classList.remove('d_none');
    exitFullscreenModus();
    setTimeout(() => {
        document.getElementById('fullscreen_button').classList.add('d_none');
    }, 100);
}


/**
 * Reverses the fade-out effect on the win screen by removing the fade-in class
 * and adding a fade-out class that transitions back to transparency.
 */
function fadeInWinScreen() {
    setTimeout(() => {
        const overlay = document.getElementById('win_fade_overlay');
        overlay.classList.remove('fade-in-white');
        overlay.classList.add('fade-out-white');
    }, 5500);
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