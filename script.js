// Globale Konfiguration
const frameWidth = 50;
const walkFrames = 6;
const idleFrames = 4;
let walkTimeoutId;
let animationFrameId;
let idleTimeoutId;
let selectedCharacterType;

/**
 * Init wird beim Seitenladen aufgerufen
 */
function init() {
    animateCharacter();
}

/**
 * Aktualisiert das Sprite für ein beliebiges Element
 * @param {HTMLElement} element - Das Element, das animiert werden soll
 * @param {Object} currentFrame - Objekt mit dem aktuellen Frame-Wert
 * @param {number} totalFrames - Anzahl der Animationsframes
 */
function updateSprite(element, currentFrame, totalFrames) {
    currentFrame.value = (currentFrame.value + 1) % totalFrames;
    const offsetX = currentFrame.value * frameWidth;
    element.style.backgroundPosition = `-${offsetX}px 0`;
}

/**
 * Startet die Idle-Animation für ein Element
 * @param {HTMLElement} element 
 * @param {Object} currentFrame 
 */
function startIdleAnimation(element, currentFrame) {
    element.style.backgroundImage = "url('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')";
    element.style.backgroundSize = `${frameWidth * idleFrames}px 50px`;
    currentFrame.value = 0;

    function idle() {
        updateSprite(element, currentFrame, idleFrames);
        idleTimeoutId = setTimeout(idle, 240);
    }
    idle();
}

/**
 * Lässt ein Element nach rechts laufen und wechselt dann zur Idle-Animation
 * @param {HTMLElement} element 
 * @param {Object} currentFrame 
 * @param {number} startPos 
 * @param {number} endPos 
 * @param {number} speed 
 */
function walk(element, currentFrame, startPos, endPos, speed) {
    let position = startPos;

    function step() {
        if (position < endPos) {
            position += speed;
            element.style.left = position + 'px';
            updateSprite(element, currentFrame, walkFrames);
            animationFrameId = requestAnimationFrame(() => {
                walkTimeoutId = setTimeout(step, 120);
            });
        } else {
            element.style.transform = 'scaleX(-1)';
            startIdleAnimation(element, currentFrame);
        }
    }

    step();
}

/**
 * Start-Character animieren
 */
function animateCharacter() {
    const character = document.querySelector('.character-animation');
    if (!character) return;

    const currentFrame = { value: 0 };
    walk(character, currentFrame, 0, 620, 4);
}


function stopStartScreenAnimation() {
    clearTimeout(walkTimeoutId);
    clearTimeout(idleTimeoutId);
    cancelAnimationFrame(animationFrameId);
}


/**
 * Menü-Character erstellen & idle animieren
 */
function showMenuCharacter() {
/*     const menuChar = document.createElement('div');
    menuChar.classList.add('character-animation');
    menuChar.style.position = 'absolute';
    menuChar.style.left = '20px';
    menuChar.style.bottom = '32px';

    document.getElementById('menu_screen').appendChild(menuChar);*/

    const currentFrame = { value: 0 }; 
    const menuChar = document.getElementById("character_menu")
    startIdleAnimation(menuChar, currentFrame);
}

/**
 * Header animieren
 */
function animateHeader() {
    const header = document.querySelector('#start_screen header');
    header.classList.add('animate');
}

function animateLogo() {
    document.getElementById("game_over_logo").classList.add("animate");
}

/**
 * Menü-Screen öffnen
 */
function openMenuScreen() {
    stopStartScreenAnimation();
    animateHeader();
    document.getElementById("new_game_button").classList.add('d_none');
    document.getElementById("character_start").classList.add('d_none');

/*     const startChar = document.querySelector('.character-animation');
    if (startChar) startChar.style.display = 'none'; */

    setTimeout(() => {
        document.getElementById("start_screen").classList.add('d_none');
        document.getElementById("menu_screen").classList.remove('d_none');
        document.getElementById("header").classList.remove('d_none');
        showMenuCharacter();
    }, 800);
}


function selectYourCharacter(id) {
    document.getElementById("Pink-Monster").classList.remove('active');
    document.getElementById("Owlet-Monster").classList.remove('active');
    document.getElementById("Dude-Monster").classList.remove('active');
    document.getElementById(id).classList.add('active');
    document.getElementById("play_button").disabled = false;
    document.getElementById("play_button").classList.add("play-buttn-enabled");
    selectedCharacterType = id;
}

function closeOverlay(event, id) {
    if (event) {
        event.stopPropagation();
    }
    document.getElementById(id).classList.add("d_none");
}

function openOverlay(id) {
    document.getElementById(id).classList.remove("d_none");
}

function setupToggleSwitch(id) {
    const element = document.getElementById(id);
    element.classList.toggle('on');

}

function showGameOver() {
    const gameOverText = document.getElementById('game_over_text');
    const screen = document.getElementById('game_over_logo');
    screen.classList.remove('hidden');
    gameOverText.innerHTML = ''; // Reset in case it's shown again

    const text = 'GAME OVER!';
    [...text].forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        span.style.animationDelay = `${index * 0.2}s`;
        gameOverText.appendChild(span);
    });

}

function showYouWin() {
    const winText = document.getElementById('you_win_text');
    const text = 'YOU WIN!';
    winText.innerHTML = '';

    const animationDelay = 0.2; // schneller als bei Game Over
    const animationDuration = 0.4;

    [...text].forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add('letter-win');
        span.style.animationDelay = `${i * animationDelay}s`;
        span.style.animationDuration = `${animationDuration}s`;
        winText.appendChild(span);
    });
}

function showStartScreen() {
    // Verstecke andere Screens
        document.getElementById('win_screen').classList.add('d_none');
        document.getElementById('canvas').classList.add('d_none');

    // Zeige den Startscreen
    document.getElementById('start_screen').classList.remove('d_none');
    document.getElementById("character_start").classList.remove('d_none');
    const header = document.querySelector('#start_screen header');
    header.classList.remove('animate');
    document.getElementById('new_game_button').classList.remove('d_none');
   animateCharacter();
    
    // Falls nötig, hier noch Start-Button aktivieren oder Animation starten
}



