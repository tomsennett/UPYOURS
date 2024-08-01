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

    // Reset event properties after update
    elements.forEach(element => {
      resetEventProperties(element);
    });
  }

  function resetEventProperties(element) {
    // List of events being tracked
    const events = [
      'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove',
      'keydown', 'keyup', 'keypress', 'focus', 'blur', 'input', 'change',
      'submit', 'reset', 'select', 'focusin', 'focusout', 'dblclick',
      'contextmenu', 'wheel', 'touchstart', 'touchmove', 'touchend',
      'touchcancel', 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter',
      'dragleave', 'drop', 'pointerdown', 'pointerup', 'pointermove',
      'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
      'pointercancel', 'gotpointercapture', 'lostpointercapture', 'abort',
      'animationstart', 'animationend', 'animationiteration', 'transitionend',
      'beforeinput', 'canplay', 'canplaythrough', 'durationchange', 'emptied',
      'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause',
      'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled',
      'suspend', 'timeupdate', 'volumechange', 'waiting', 'load', 'resize',
      'scroll', 'unload', 'beforeunload', 'hashchange', 'popstate', 'storage',
      'message', 'error', 'offline', 'online', 'pagehide', 'pageshow', 'readystate',
      'visibilitychange', 'wheel', 'copy', 'cut', 'paste', 'fullscreenchange',
      'fullscreenerror', 'pointerlockchange', 'pointerlockerror', 'selectionchange'
    ];

    // Set each event property to null
    events.forEach(event => {
      element[`event_${event}`] = null;
    });
  }

  // Initialize event listeners on a specific UPME element
  function initEventListenersOnElement(element) {
    const events = [
      'click', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove',
      'keydown', 'keyup', 'keypress', 'focus', 'blur', 'input', 'change',
      'submit', 'reset', 'select', 'focusin', 'focusout', 'dblclick',
      'contextmenu', 'wheel', 'touchstart', 'touchmove', 'touchend',
      'touchcancel', 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter',
      'dragleave', 'drop', 'pointerdown', 'pointerup', 'pointermove',
      'pointerover', 'pointerout', 'pointerenter', 'pointerleave',
      'pointercancel', 'gotpointercapture', 'lostpointercapture', 'abort',
      'animationstart', 'animationend', 'animationiteration', 'transitionend',
      'beforeinput', 'canplay', 'canplaythrough', 'durationchange', 'emptied',
      'ended', 'error', 'loadeddata', 'loadedmetadata', 'loadstart', 'pause',
      'play', 'playing', 'progress', 'ratechange', 'seeked', 'seeking', 'stalled',
      'suspend', 'timeupdate', 'volumechange', 'waiting', 'load', 'resize',
      'scroll', 'unload', 'beforeunload', 'hashchange', 'popstate', 'storage',
      'message', 'error', 'offline', 'online', 'pagehide', 'pageshow', 'readystate',
      'visibilitychange', 'wheel', 'copy', 'cut', 'paste', 'fullscreenchange',
      'fullscreenerror', 'pointerlockchange', 'pointerlockerror', 'selectionchange'
    ];

    events.forEach(event => {
      element.addEventListener(event, (evt) => {
        // Store the event details in a custom property
        element[`event_${event}`] = {
          type: evt.type,
          timeStamp: evt.timeStamp,
          target: evt.target,
          currentTarget: evt.currentTarget,
          // Additional properties can be added here as needed
        };
      });
    });
  }

  // Initialize event listeners on all UPME elements
  function initEventListeners() {
    const elements = document.querySelectorAll('.UPME');
    elements.forEach(initEventListenersOnElement);
  }

  // Use MutationObserver to watch for added nodes and initialize UPME elements
  function observeDOMChanges() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE && node.classList.contains('UPME')) {
            initEventListenersOnElement(node);
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Initialize the library
  function init() {
    document.addEventListener('DOMContentLoaded', () => {
      initEventListeners();
      observeDOMChanges();
      requestAnimationFrame(function loop() {
        update();
        requestAnimationFrame(loop);
      });
    });
  }

  // Start the library
  init();
})();
