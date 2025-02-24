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

document.addEventListener("DOMContentLoaded", function () {
    const progressBars = document.querySelectorAll(".progress-bar .fill");

    progressBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = "0";

        setTimeout(() => {
            bar.style.transition = "width 2s ease-in-out";
            bar.style.width = targetWidth;
        }, 500);
    });
});