let canvas;
let world;
let keyboard = new Keyboard();
let fadeOverlayOpacity = 0;



window.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        keyboard.RIGHT = true;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        keyboard.LEFT = true;
    }
    if (e.code == "ArrowUp" || e.code == "Space") {
        keyboard.UP = true;
        world.character.isJumping = true;
        world.character.currentImage = 0;
    }
    if (e.code == "KeyF") {
        keyboard.F = true;
        world.character.isThrowing = true;
        world.character.currentImage = 0;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = true;
    }
})


window.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight" || e.code == "KeyD") {
        keyboard.RIGHT = false;
    }
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        keyboard.LEFT = false;
    }
    if (e.code == "ArrowUp" || e.code == "Space") {
        keyboard.UP = false;
    }
    if (e.code == "KeyF") {
        keyboard.F = false;
    }
    if (e.code == "ArrowDown") {
        keyboard.DOWN = false;
    }
})

function loadLevel1() {
    clearTimeout(idleTimeoutId);
    document.getElementById("menu_screen").classList.add('d_none');
    canvas = document.getElementById('canvas');
    canvas.classList.remove("d_none");
    const level1 = createLevel1();
    world = new World(canvas, keyboard, level1);
    fadeInFromWhite();
}

function loadEndbossLevel(canvas, keyboard) {
    const level = createEndBossLevel1();
    const existingCharacter = world.character;
    const newWorld = new World(canvas, keyboard, level);
    copyCharacterStats(existingCharacter, newWorld);
    initializeWorldPosition(newWorld);
    connectEnemiesToWorld(newWorld);
    return newWorld;
}


function copyCharacterStats(existingCharacter, newWorld) {
    newWorld.character.health = existingCharacter.health;
    newWorld.statusBar.setPercentage(newWorld.character.health);
    newWorld.character.energy = existingCharacter.energy;
    newWorld.energyBar.setPercentage(newWorld.character.energy);
    newWorld.character.coinCount = existingCharacter.coinCount;
}


function initializeWorldPosition(newWorld) {
    newWorld.character.x = 50;
    newWorld.camera_x = 0;
}


function connectEnemiesToWorld(newWorld) {
    newWorld.level.enemies.forEach(enemy => {
        enemy.character = newWorld.character;
        enemy.world = newWorld;
    });
}


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

function stopGame() {
    world.clearAllIntervals();
    world.stopDrawing();
}

function gameOver() {
    stopGame();
    document.getElementById("game_over_screen").classList.remove("d_none");
    document.getElementById("header").classList.add("d_none");
    setTimeout(() => {
        document.getElementById("game_over_logo").classList.add("show");
    }, 10);
    setTimeout(() => {
        showGameOver();
    }, 1000);
    setTimeout(() => {
        document.getElementById("game_over_logo").classList.add("d_none");
        document.getElementById("game_over_body").classList.remove("d_none");
    }, 4500);
}

function gameWin() {
    stopGame();
    document.getElementById("win_screen").classList.remove("d_none");
    showYouWin();
    setTimeout(() => {
        fadeOutWinScreen(() => {

        });
    }, 3000);
}

function fadeOutWinScreen(callback) {
    const overlay = document.getElementById('win_fade_overlay');
    overlay.classList.add('fade-in-white');
    setTimeout(() => {
        if (callback) callback();
    }, 600); // nach CSS transition
}

function fadeInWinScreen() {
    const overlay = document.getElementById('win_fade_overlay');
    overlay.classList.remove('fade-in-white');
}

function retryGame() {
    document.getElementById("header").classList.remove("d_none");
    document.getElementById("game_over_screen").classList.add('d_none');
    loadLevel1();
}

function returnToMenu() {
    document.getElementById("header").classList.remove("d_none");
    const startChar = document.querySelector('.character-animation');
    if (startChar) startChar.style.display = 'none';
    showMenuCharacter();
    document.getElementById("menu_screen").classList.remove('d_none');
    document.getElementById("Pink-Monster").classList.remove('active');
    document.getElementById("Owlet-Monster").classList.remove('active');
    document.getElementById("Dude-Monster").classList.remove('active');
    document.getElementById("play_button").disabled = true;
    document.getElementById("play_button").classList.remove("play-buttn-enabled");
    document.getElementById("game_over_screen").classList.add('d_none');
    document.getElementById("canvas").classList.add('d_none');

}






/* /* *
 * This function initializes the game by setting up the level and creating a new world instance.
 * It also binds mobile buttons for touch controls and sets a timeout to hide the loading screen and show the main game screen.

function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    bindMobileButtons();

    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('wrapper-fullscreen').style.display = 'flex';
        document.getElementById('mobile-control-panel').classList.remove('d-none');
        }, 4000);

    }


/**
 * This function initiates the game by replacing the start or end screen with the canvas/ game screen.
 * It also starts a countdown and initializes the game.

async function startGame() {
    countdownStart();
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    init();
}

function returnToStart() {
    stopGame();
    document.getElementById('start-screen').classList.remove('d-none');
    document.getElementById('end-screen').classList.add('d-none');
    document.getElementById('canvas').classList.add('d-none');
    selectLanguage(language);
} */