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