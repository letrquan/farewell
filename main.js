document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    const enterBtn = document.getElementById('enter-btn');
    const overlay = document.getElementById('intro-overlay');
    const storyMain = document.getElementById('story-main');
    const revealBtn = document.getElementById('reveal-message');
    const modal = document.getElementById('farewell-modal');
    const closeBtn = document.querySelector('.close-btn');

    // 1. Particle Starfield Logic
    let stars = [];
    const starCount = 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Star {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.z = Math.random() * canvas.width;
            this.size = 0.5;
        }
        update() {
            this.z -= 0.5; // Approach speed
            if (this.z <= 0) this.reset();
        }
        draw() {
            let x = (this.x - canvas.width / 2) * (canvas.width / this.z);
            x += canvas.width / 2;
            let y = (this.y - canvas.height / 2) * (canvas.width / this.z);
            y += canvas.height / 2;
            let s = this.size * (canvas.width / this.z);

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${1 - this.z / canvas.width})`;
            ctx.arc(x, y, s, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < starCount; i++) stars.push(new Star());

    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        stars.forEach(s => {
            s.update();
            s.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();

    // 2. Navigation & Experience Start
    enterBtn.addEventListener('click', () => {
        overlay.classList.add('hide');
        storyMain.classList.remove('hidden');
        setTimeout(() => {
            // Activate first scene
            document.querySelector('.story-scene').classList.add('active');
        }, 500);
    });

    // 3. Scroll Activation Logic (Manual per Scene)
    storyMain.addEventListener('scroll', () => {
        const scenes = document.querySelectorAll('.story-scene');
        const scrollPos = storyMain.scrollTop + window.innerHeight / 2;

        scenes.forEach(scene => {
            if (scrollPos > scene.offsetTop && scrollPos < scene.offsetTop + scene.offsetHeight) {
                scene.classList.add('active');
            }
        });
    });

    // 4. Modal Logic
    revealBtn.addEventListener('click', () => {
        modal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Allow double-click to edit placeholder in browser
    const editable = document.getElementById('user-content');
    editable.addEventListener('dblclick', function() {
        this.contentEditable = true;
        this.focus();
    });
});
