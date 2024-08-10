(function () {
  'use strict';

  // Global object to store functions keyed by selectors
  const UPYOURS = {};

  // Helper function to safely execute UPYOURS functions with context set to the element
  function safeExecute(func, element) {
    try {
      if (typeof func === 'function') {
        func.call(element);
      }
    } catch (error) {
      console.error(`Error executing function for ${element}:`, error);
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

  // Set to keep track of elements with the UPYOURS class
  const currentUPYOURSElements = new Set();

  // The main update function
  function update() {
    const elements = document.querySelectorAll('*');
    const newUPYOURSElements = new Set();

    elements.forEach(element => {
      let hasMatchingSelector = false;

      for (const selector in UPYOURS) {
        if (element.matches(selector)) {
          hasMatchingSelector = true;
          safeExecute(UPYOURS[selector], element);
        }
      }

      if (hasMatchingSelector) {
        newUPYOURSElements.add(element);
        if (!currentUPYOURSElements.has(element)) {
          addEventListeners(element);
        }
      } else if (currentUPYOURSElements.has(element)) {
        removeEventListeners(element);
      }
    });

    // Update the current UPYOURS elements set
    currentUPYOURSElements.forEach(element => {
      if (!newUPYOURSElements.has(element)) {
        currentUPYOURSElements.delete(element);
      }
    });

    newUPYOURSElements.forEach(element => {
      currentUPYOURSElements.add(element);
    });

    // Reset event properties after the update
    currentUPYOURSElements.forEach(element => {
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

  // Expose UPYOURS to the global scope
  window.UPYOURS = UPYOURS;

  // Start the library
  init();
})();
