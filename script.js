// script.js

// Gestion des animations dynamiques pour toutes les sections avec IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1 // Déclenche l'animation lorsque 10% de la section est visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cible tous les éléments à animer dans cette section
                const elementsToAnimate = entry.target.querySelectorAll('h2, .bio-text, .about-text, .project-item, .quote-item, .more-quotes, .form-item, .submit-btn');
                elementsToAnimate.forEach((item, index) => {
                    // Ajoute la classe 'visible' avec un léger délai pour un effet progressif
                    setTimeout(() => {
                        item.classList.add('visible');
                    }, index * 200); // Délai de 200ms entre chaque élément
                });
                observer.unobserve(entry.target); // Arrête d'observer cette section une fois animée
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
