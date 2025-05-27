// script.js

// Sélectionne tous les liens <a> dans la barre de navigation (éléments <a> à l'intérieur de <nav>)
// 'document.querySelectorAll' renvoie une liste de tous les éléments correspondant au sélecteur CSS 'nav a'
document.querySelectorAll('nav a').forEach(anchor => {
    // Pour chaque lien (anchor) trouvé, ajoute un écouteur d'événements pour l'événement 'click'
    // 'forEach' boucle sur chaque élément de la liste, et 'anchor' représente un lien <a> individuel
    anchor.addEventListener('click', function(e) {
        // Empêche le comportement par défaut du lien (qui serait normalement sauter directement à la section)
        // 'e.preventDefault()' stoppe l'action par défaut du clic sur un lien (le saut brutal)
        e.preventDefault();

        // Récupère l'ID de la section cible à partir de l'attribut 'href' du lien
        // 'this.getAttribute('href')' récupère la valeur de l'attribut href (ex. : '#home')
        // 'substring(1)' enlève le '#' pour obtenir uniquement l'ID (ex. : 'home')
        const targetId = this.getAttribute('href').substring(1);

        // Trouve l'élément HTML correspondant à l'ID cible
        // 'document.getElementById(targetId)' renvoie l'élément avec l'ID spécifié (ex. : <section id="home">)
        const targetSection = document.getElementById(targetId);

        // Calcule la hauteur de la barre de navigation
        // 'document.querySelector('nav')' sélectionne l'élément <nav>
        // 'offsetHeight' renvoie la hauteur totale de la barre de navigation en pixels (incluant padding)
        const navHeight = document.querySelector('nav').offsetHeight;

        // Fait défiler la page vers la section cible avec un effet fluide
        // 'window.scrollTo' déplace la fenêtre du navigateur à une position spécifique
        // 'top: targetSection.offsetTop - navHeight' définit la position de défilement :
        //    - 'targetSection.offsetTop' donne la position de la section par rapport au haut de la page
        //    - '- navHeight' ajuste la position pour que la section ne soit pas masquée par la barre de navigation
        // 'behavior: 'smooth'' active un défilement fluide (smooth scrolling) au lieu d'un saut brutal
        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});
