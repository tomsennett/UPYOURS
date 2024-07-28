(function (global) {
    class UpdateBus {
      constructor() {
        this.updateFunctions = [];
        this.eventStates = new WeakMap(); // Store event states for elements
        this.currentElement = null; // To keep track of the current element being processed
        this.start();
      }
  
      start() {
        const updateLoop = () => {
          this.scanDOM();
          this.runUpdateFunctions();
          requestAnimationFrame(updateLoop);
        };
        requestAnimationFrame(updateLoop);
      }
  
      stop() {
        // No need to stop requestAnimationFrame loop as it is automatically managed.
      }
  
      scanDOM() {
        const elements = document.querySelectorAll('.UPME');
        elements.forEach(element => {
          if (!this.eventStates.has(element)) {
            this.eventStates.set(element, {});
            const events = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup', 'focus', 'blur'];
            events.forEach(event => {
              this.addEventListener(element, event);
            });
          }
          const classes = element.classList;
          classes.forEach(cls => {
            if (cls !== 'UPME') {
              const functionName = `UPME_${cls}`;
              if (typeof global[functionName] === 'function') {
                const updateFunction = () => {
                  this.currentElement = element;
                  global[functionName].call(element, this_event);
                  this.currentElement = null;
                };
                if (!this.updateFunctions.includes(updateFunction)) {
                  this.addUpdateFunction(updateFunction);
                }
              }
            }
          });
        });
      }
  
      addUpdateFunction(func) {
        if (typeof func === 'function') {
          this.updateFunctions.push(func);
        }
      }
  
      runUpdateFunctions() {
        this.updateFunctions.forEach(func => func());
      }
  
      // Check if the current element had a specific event
      eventOccurred(eventName) {
        const element = this.currentElement;
        const state = this.eventStates.get(element);
        if (state && state[eventName]) {
          state[eventName] = false; // Reset event state after checking
          return true;
        }
        return false;
      }
  
      // Add event listener to element and track its occurrence
      addEventListener(element, eventName) {
        element.addEventListener(eventName, () => {
          console.log(`Event ${eventName} occurred on`, element);
          const state = this.eventStates.get(element);
          state[eventName] = true;
        });
      }
    }
  
    // Initialize the update bus with requestAnimationFrame
    const updateBus = new UpdateBus();
  
    global.UPMEBus = {
      start: () => updateBus.start(),
      stop: () => updateBus.stop(),
      addUPMEFunction: (className, func) => {
        if (typeof func === 'function') {
          global[`UPME_${className}`] = func;
        }
      },
      eventOccurred: (eventName) => updateBus.eventOccurred(eventName),
      addEventListener: (element, eventName) => updateBus.addEventListener(element, eventName)
    };
  
    // Simplified UPME object for event checking
    global.this_event = (eventName) => UPMEBus.eventOccurred(eventName);
  
    // Automatically scan for new elements and attach event listeners
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1 && node.classList.contains('UPME')) {
              const events = ['click', 'mouseover', 'mouseout', 'keydown', 'keyup', 'focus', 'blur'];
              events.forEach(event => {
                UPMEBus.addEventListener(node, event);
              });
            }
          });
        });
      });
  
      observer.observe(document.body, { childList: true, subtree: true });
  
      // Initial scan to set up event listeners on existing elements
      updateBus.scanDOM();
    });
  
  })(window);
  