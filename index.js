window.onscroll = function () {
    let scrollTop = document.documentElement.scrollTop;
    let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercent = (scrollTop / scrollHeight) * 100;
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
    let backButton = document.getElementById('backButton');
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

const icons = document.querySelectorAll('.circle img');
const totalIcons = icons.length;
const radius = 300;

function setInitialPositions() {
    icons.forEach((icon, index) => {
        const angle = (index * 360) / totalIcons;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        icon.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
}

function rotateIcons(scrollPosition) {
    icons.forEach((icon, index) => {
        const angle = (scrollPosition / 5 + index * (360 / totalIcons)) % 360;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);
        icon.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    });
}

setInitialPositions();
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    rotateIcons(scrollPosition);
});

function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;

        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}