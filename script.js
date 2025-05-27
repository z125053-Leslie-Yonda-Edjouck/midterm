/ script.js

// Navigation fluide
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        window.scrollTo({
            top: targetSection.offsetTop - 60, // Ajustement pour la navbar fixe
            behavior: 'smooth'
        });
    });
});

// Exemple : Afficher une alerte pour le formulaire de contact 
document.addEventListener('DOMContentLoaded', () => {
    const contactSection = document.getElementById('contact');
    contactSection.addEventListener('click', () => {
        alert('Merci de visiter mon portfolio ! Envoyez-moi un email pour me contacter.');
    });
});
