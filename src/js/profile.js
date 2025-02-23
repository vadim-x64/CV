document.addEventListener('DOMContentLoaded', () => {
    const leftHalf = document.querySelector('.panel-half.left');
    const rightHalf = document.querySelector('.panel-half.right');
    const languageLabel = document.querySelector('.language');
    const themeLabel = document.querySelector('.theme');
    leftHalf.addEventListener('click', () => {
        leftHalf.classList.toggle('active');
        languageLabel.textContent = languageLabel.textContent === 'EN' ? 'UA' : 'EN';
    });
    rightHalf.addEventListener('click', () => {
        rightHalf.classList.toggle('active');
        themeLabel.textContent = themeLabel.textContent === 'OFF' ? 'ON' : 'OFF';
    });
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