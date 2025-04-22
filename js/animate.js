console.log("Script loaded");

/// script.js

// Select all elements with the class 'animate'
const animatedElements = document.querySelectorAll('.animate');

// Observer options
const observerOptions = {
  threshold: 0.1, // Trigger when 10% of the element is visible
  rootMargin: '0px 0px -100px 0px', // Adjusts when the animation triggers
};

// Callback function for Intersection Observer
const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Element has entered the viewport
      entry.target.classList.add('in-view');
    } else {
      // Element has left the viewport
      entry.target.classList.remove('in-view');
    }
  });
};

// Create the Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Observe each animated element
animatedElements.forEach((element) => {
  observer.observe(element);
});
