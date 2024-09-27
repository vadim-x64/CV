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