const scenes = document.querySelectorAll('.scene');
const finalMessage = document.getElementById('final-message');
const finalBtn = document.getElementById('final-btn');
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.3 });

scenes.forEach(scene => observer.observe(scene));

finalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    finalMessage.classList.remove('hidden');
    setTimeout(() => {
        finalMessage.classList.add('show');
    }, 100);
});

musicToggle.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = '🔊';
    } else {
        backgroundMusic.pause();
        musicToggle.textContent = '🔇';
    }
});

function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 5 + 5 + 's';
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 10000);
}

setInterval(createHeart, 2000);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});