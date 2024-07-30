(function () {
  'use strict';

  // Helper function to safely execute UPME functions with context set to the element
  function safeExecute(func, element) {
    try {
      if (typeof func === 'function') {
        func.call(element);
      }
    } catch (error) {
      console.error(`Error executing ${func.name}:`, error);
    }
  }

  // The main update function
  function update() {
    const elements = document.querySelectorAll('.UPME');

    elements.forEach(element => {
      // Iterate through all classes of the element
      element.classList.forEach(cls => {
        if (cls !== 'UPME') {
          const updateFunction = window[`UPME_${cls}`];
          safeExecute(updateFunction, element);
        }
      });
    });

    // Remove event classes and data attributes after update
    elements.forEach(element => {
      removeEventClassesAndDataAttributes(element);
    });

    requestAnimationFrame(update);
  }

  function removeEventClassesAndDataAttributes(element) {
    // Remove event- classes
    const eventClasses = [];
    element.classList.forEach(cls => {
      if (cls.startsWith('event-')) {
        eventClasses.push(cls);
      }
    });
    eventClasses.forEach(cls => element.classList.remove(cls));

    // Remove only data- attributes related to events
    Array.from(element.attributes).forEach(attr => {
      if (attr.name.startsWith('data-event-')) {
        element.removeAttribute(attr.name);
      }
    });
  }

  // Initialize event listeners on elements with class UPME
  function initEventListeners() {
    const elements = document.querySelectorAll('.UPME');
    const events = [
      'click', 'mousedown', 'mouseup', 'mouseover', 
      'mouseout', 'mousemove', 'keydown', 'keyup', 
      'focus', 'blur', 'input'
    ];

    elements.forEach(element => {
      events.forEach(event => {
        element.addEventListener(event, (evt) => {
          if (!element.classList.contains(`event-${event}`)) {
            element.classList.add(`event-${event}`);
          }

          // Store each key-value pair from the event object as a data- attribute
          for (const key in evt) {
            if (evt.hasOwnProperty(key)) {
              const value = evt[key];
              // Skip undefined or null values
              if (value !== undefined && value !== null) {
                // Convert key to kebab-case for data attributes
                const dataKey = `data-event-${event}-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
                element.setAttribute(dataKey, value.toString());
              }
            }
          }
        });
      });
    });
  }

  // Initialize the library
  function init() {
    document.addEventListener('DOMContentLoaded', () => {
      initEventListeners();
      requestAnimationFrame(update);
    });
  }

  // Start the library
  init();
})();
