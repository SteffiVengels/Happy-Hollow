function animateCharacter() {
    const character = document.querySelector('.character-animation');
    let position = 0;
    const endPosition = 620;
    const speed = 4;

    const frameWidth = 50;
    const walkFrames = 6;
    const idleFrames = 4;
    let currentFrame = 0;

    function updateSprite(totalFrames) {
        currentFrame = (currentFrame + 1) % totalFrames;
        const offsetX = currentFrame * frameWidth;
        character.style.backgroundPosition = `-${offsetX}px 0`;
    }

    function walk() {
        if (position < endPosition) {
            position += speed;
            character.style.left = position + 'px';
            updateSprite(walkFrames);
            setTimeout(() => requestAnimationFrame(walk), 120);
        } else {
            turnAround();
            startIdleAnimation();
        }
    }

    function turnAround() {
        character.style.transform = 'scaleX(-1)'; // Spiegelung
    }

    function startIdleAnimation() {
        // Wechsel zu Idle-Sprite
        character.style.backgroundImage = "url('./assets/img/pixel-art-tiny-hero-sprites/1 Pink_Monster/Pink_Monster_Idle_4.png')";
        character.style.backgroundSize = `${frameWidth * idleFrames}px 50px`;
        currentFrame = 0;

        function idle() {
            updateSprite(idleFrames);
            setTimeout(idle, 240); // idle langsamer animieren
        }

        idle();
    }

    walk();
}