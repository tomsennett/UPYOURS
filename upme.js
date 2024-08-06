(function () {
  'use strict';

  // Set to keep track of elements with the UPME class
  const currentUPMEElements = new Set();

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

  // Function to add event listeners to an element
  function addEventListeners(element) {
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
        element[`event_${event}`] = evt;
      });
    });
  }

  // Function to remove event listeners from an element
  function removeEventListeners(element) {
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
      const eventListener = element[`event_${event}`];
      if (eventListener) {
        element.removeEventListener(event, eventListener);
        element[`event_${event}`] = null;
      }
    });
  }

  // The main update function
  function update() {
    const elements = document.querySelectorAll('*');
    const newUPMEElements = new Set();

    elements.forEach(element => {
      if (element.classList.contains('UPME')) {
        newUPMEElements.add(element);
        if (!currentUPMEElements.has(element)) {
          addEventListeners(element);
        }

        // Iterate through all classes of the element and execute corresponding functions
        element.classList.forEach(cls => {
          if (cls !== 'UPME') {
            const updateFunction = window[`UPME_${cls}`];
            safeExecute(updateFunction, element);
          }
        });
      } else if (currentUPMEElements.has(element)) {
        removeEventListeners(element);
      }
    });

    // Update the current UPME elements set
    currentUPMEElements.forEach(element => {
      if (!newUPMEElements.has(element)) {
        currentUPMEElements.delete(element);
      }
    });

    newUPMEElements.forEach(element => {
      currentUPMEElements.add(element);
    });

    // Reset event properties after the update
    currentUPMEElements.forEach(element => {
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

  // Initialize the library
  function init() {
    document.addEventListener('DOMContentLoaded', () => {
      requestAnimationFrame(function loop() {
        update();
        requestAnimationFrame(loop);
      });
    });
  }

  // Start the library
  init();
})();
