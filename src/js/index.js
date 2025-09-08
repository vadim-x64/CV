const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

prevButton.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

nextButton.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        return;
    }

    if (currentScroll > lastScroll && currentScroll > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }

    lastScroll = currentScroll;
});

document.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const leftPhoto = document.querySelector('.left-photo');
    const leftPhotoImg = document.querySelector('.left-photo img');

    leftPhoto.addEventListener('click', function() {
        leftPhotoImg.classList.toggle('revealed');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('practiceModal');
    const btn = document.getElementById('practiceBtn');
    const closeBtn = modal.querySelector('.close');

    btn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});


document.querySelectorAll('.spoiler').forEach(spoiler => {
    const canvas = spoiler.querySelector('.spoiler-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = spoiler.offsetWidth;
        canvas.height = spoiler.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let balls = [];

    for (let i = 0; i < 200; i++) {
        balls.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.5 + 0.5,
            dx: (Math.random() - 0.5) * 0.5,
            dy: (Math.random() - 0.5) * 0.5
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#FFF";

        balls.forEach(b => {
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
            ctx.fill();
            b.x += b.dx;
            b.y += b.dy;
            if (b.x < 0 || b.x > canvas.width) b.dx *= -1;
            if (b.y < 0 || b.y > canvas.height) b.dy *= -1;
        });

        requestAnimationFrame(animate);
    }

    animate();

    spoiler.addEventListener('click', () => {
        spoiler.classList.toggle('active');
    });
});