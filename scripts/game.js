let canvas;
let world;
let keyboard = new Keyboard();
let fadeOverlayOpacity = 0;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard, level = level1);
}

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

function loadEndbossLevel(canvas, keyboard) {
    const level = createEndBossLevel(); // alternativ direkt: new Level(...)
    const newWorld = new World(canvas, keyboard, level);

    // Anfangsposition und Kamera zurücksetzen
    newWorld.character.x = 50;
    newWorld.camera_x = 0;

    // Gegner mit der neuen Character-Referenz verbinden
    newWorld.level.enemies.forEach(enemy => {
        enemy.character = newWorld.character;
        enemy.world = newWorld;
    });

    return newWorld;
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
            setTimeout(callback, 120); // danach z. B. Weltwechsel starten
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