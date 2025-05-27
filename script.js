// script.js
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const navHeight = document.querySelector('nav').offsetHeight; // Calcule la hauteur de la nav dynamiquement
        window.scrollTo({
            top: targetSection.offsetTop - navHeight, // Ajuste le défilement en fonction de la hauteur de la nav
            behavior: 'smooth'
        });
    });
});
