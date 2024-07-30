(function () {
  'use strict';

  // Helper function to safely execute update functions with context set to the element
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
          const updateFunction = window[`UPDATE_${cls}`];
          safeExecute(updateFunction, element);
        }
      });
    });

    // Remove event classes after update
    elements.forEach(element => {
      removeEventClasses(element);
    });

    requestAnimationFrame(update);
  }

  function removeEventClasses(element) {
    const eventClasses = [];
    element.classList.forEach(cls => {
      if (cls.startsWith('event-')) {
        eventClasses.push(cls);
      }
    });
    eventClasses.forEach(cls => element.classList.remove(cls));
  }

  // Initialize event listeners on elements with class UPME
  function initEventListeners() {
    const elements = document.querySelectorAll('.UPME');
    const events = [
      'click', 'mousedown', 'mouseup', 'mouseover', 
      'mouseout', 'mousemove', 'keydown', 'keyup', 
      'focus', 'blur'
    ];

    // Specify relevant properties to be captured explicitly
    const relevantProperties = [
      'key', 'code', 'type', 'target', 'clientX', 'clientY', 
      'pageX', 'pageY', 'which', 'button'
    ];

    elements.forEach(element => {
      events.forEach(event => {
        element.addEventListener(event, (evt) => {
          if (!element.classList.contains(`event-${event}`)) {
            element.classList.add(`event-${event}`);
          }

          // Store each relevant key-value pair from the event object as a data- attribute
          relevantProperties.forEach(prop => {
            if (prop in evt) {
              const value = evt[prop];
              if (value !== undefined && value !== null) {
                const dataKey = `data-${event}-${prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
                element.setAttribute(dataKey, value.toString());
              }
            }
          });

          // Fallback to capture all other properties
          for (const key in evt) {
            if (evt.hasOwnProperty(key) && !relevantProperties.includes(key)) {
              const value = evt[key];
              if (value !== undefined && value !== null) {
                // Convert key to kebab-case for data attributes
                const dataKey = `data-${event}-${key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
                // Store as string to ensure compatibility
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
