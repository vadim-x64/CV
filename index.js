window.onscroll = function () {
    var scrollTop = document.documentElement.scrollTop;
    var scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrollPercent = (scrollTop / scrollHeight) * 100;
    document.getElementById("scroll-progress").style.width = scrollPercent + "%";
};

document.getElementById('iconContainer').addEventListener('click', function () {
    const photo = document.querySelector('.profile-photo');
    const icon = document.getElementById('iconContainer');
    if (photo.style.transform === 'rotateY(0deg)') {
        photo.style.transform = 'rotateY(180deg)';
        icon.style.transform = 'rotateY(0deg)';
    } else {
        photo.style.transform = 'rotateY(0deg)';
        icon.style.transform = 'rotateY(-180deg)';
    }
});

document.querySelector('.profile-photo').addEventListener('click', function () {
    const photo = document.querySelector('.profile-photo');
    const icon = document.getElementById('iconContainer');
    photo.style.transform = 'rotateY(180deg)';
    icon.style.transform = 'rotateY(0deg)';
});

document.addEventListener('scroll', function () {
    var backButton = document.getElementById('backButton');
    if (window.scrollY > 200) {
        backButton.classList.add('show');
    } else {
        backButton.classList.remove('show');
    }
});

document.getElementById('backButton').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

document.querySelectorAll('.media-container').forEach((container) => {
    const thumbnail = container.querySelector('.thumbnail');
    const videoContent = container.querySelector('.video-content');
    videoContent.pause();
    thumbnail.addEventListener('click', () => {
        container.classList.add('show-video');
        videoContent.play();
    });
    videoContent.addEventListener('click', () => {
        container.classList.remove('show-video');
        container.addEventListener('transitionend', () => {
            videoContent.pause();
            videoContent.currentTime = 0;
        }, { once: true });
    });
});

const stacks = document.querySelectorAll('.stack1, .stack2');

const options = {
    root: null,
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const icons = entry.target.querySelector('.icons');

        if (entry.isIntersecting) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.scrollY;
                const speed = 0.5;
                const direction = entry.target.classList.contains('stack1') ? -0.250 : 0.250;
                icons.style.transform = `translateX(${scrollPosition * speed * direction}px)`;
            });
        } else {
            icons.style.transform = 'translateX(0)';
        }
    });
});

stacks.forEach(stack => {
    observer.observe(stack);
});