// Handle dynamic animations for all sections with IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.1 // Trigger the animation when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Target all elements to animate within this section
                const elementsToAnimate = entry.target.querySelectorAll('h2, .bio-text, .about-text, .project-item, .quote-item, .more-quotes, .form-item, .submit-btn');
                if (elementsToAnimate.length > 0) {
                    elementsToAnimate.forEach((item, index) => {
                        // Add the 'visible' class with a slight delay for a progressive effect
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, 100 + index * 200); // Initial delay of 100ms, then 200ms between each element
                    });
                }
                observer.unobserve(entry.target); // Stop observing this section once animated
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
    });
});
