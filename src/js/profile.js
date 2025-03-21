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
    const isEnglishPage = window.location.href.includes('profile_en.html');
    const buttonText = isEnglishPage ? 'Download CV' : 'Скачати резюме';
    const resumeLink = document.querySelector('.about-me p a[download]');

    if (resumeLink) {
        const downloadBtn = document.createElement('button');
        downloadBtn.id = 'downloadResumeBtn';
        downloadBtn.className = 'download-btn';
        downloadBtn.textContent = buttonText;
        resumeLink.parentNode.replaceChild(downloadBtn, resumeLink);
    }

    const modal = document.getElementById('resumeModal');
    const downloadBtn = document.getElementById('downloadResumeBtn');
    const closeButton = document.querySelector('.close-button');

    function openModal() {
        modal.classList.add('show');
    }

    function closeModal() {
        modal.classList.remove('show');
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', openModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let visitCount = localStorage.getItem("visitCount");

    if (!visitCount) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }

    localStorage.setItem("visitCount", visitCount);

    const footer = document.querySelector(".footer");
    if (footer) {
        const visitDisplay = document.createElement("p");
        visitDisplay.className = "visit-counter";
        visitDisplay.textContent = `${visitCount}`;
        footer.appendChild(visitDisplay);
    }
});