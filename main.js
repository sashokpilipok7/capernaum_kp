document.addEventListener('DOMContentLoaded', () => {
  /** * SELECTORS (Based on existing Bootstrap/Standard classes)
   * We map elements to simple variable names to avoid cluttering HTML with IDs
   */

  // Hero: Selects the content inside the two main columns of the first container
  const heroLeft = document.querySelector('.container-fluid .col-lg-6:first-child > div');
  const heroRight = document.querySelector('.container-fluid .col-lg-6:last-child > div');

  // Stats: Selects the 4 columns in the border-bottom section
  // Note: Using the section class to differentiate
  const statsItems = document.querySelectorAll('.border-bottom .row > div');

  // Projects & News Cards: Selects all cards on the page
  const allCards = document.querySelectorAll('.card');

  // CTA: Selects the two columns inside the green background section
  const ctaItems = document.querySelectorAll('.bg-green-brand .row > div');

  /**
   * SETUP
   * Hide elements initially to prevent "flash" before animation
   */
  const hideElements = (elements) => {
    if (elements.length) {
      anime.set(elements, { opacity: 0, translateY: 20 });
    } else if (elements) {
      anime.set(elements, { opacity: 0, translateY: 20 });
    }
  };

  hideElements(heroLeft);
  hideElements(heroRight);
  hideElements(statsItems);
  hideElements(allCards);
  hideElements(ctaItems);

  /**
   * 1. HERO ANIMATION (Triggered immediately)
   */
  anime({
    targets: [heroLeft, heroRight],
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutQuad',
    duration: 1000,
    delay: anime.stagger(200), // Left animates, then Right
  });

  /**
   * 2. SCROLL OBSERVER
   * Reusable function to trigger animations when elements enter viewport
   */
  const animateOnScroll = (targets, staggerTime = 150) => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger Anime.js
            anime({
              targets: entry.target,
              opacity: [0, 1],
              translateY: [20, 0],
              easing: 'easeOutCubic',
              duration: 800,
              delay: staggerTime, // Add a tiny delay if multiple elements appear
            });
            // Stop watching this element once animated
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    ); // Trigger when 15% of element is visible

    // Attach observer to targets
    if (targets.length) {
      targets.forEach((t) => observer.observe(t));
    }
  };

  // Apply Scroll Animations
  animateOnScroll(statsItems, 100);
  animateOnScroll(allCards, 100); // Will animate Project cards and News cards as you scroll to them
  animateOnScroll(ctaItems, 200);
});
