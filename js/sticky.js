console.log("Script loaded");

/// script.js

document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.getElementById('sticky-container');
    const originalPosition = ctaButton.getBoundingClientRect().top + window.scrollY;

    window.addEventListener('scroll', function() {
        if (window.scrollY > originalPosition) {
            ctaButton.classList.add('sticky');
        } else {
            ctaButton.classList.remove('sticky');
        }
    });
});
