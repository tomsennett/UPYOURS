https://tomsennett.github.io/UPYOURS/

Documentation
UPYOURS is a lightweight JavaScript framework that allows you to define update functions for CSS selectors. The same way you can mix and match CSS styles, you can do the same for JavaScript behaviors. This framework is ideal for small-scale web apps, prototyping, and simple games, enabling real-time interactivity directly through the DOM.

Installation
To use UPYOURS.js, include the script in your project via a CDN or locally:

html
Copy code
<script src="[https://cdn.your-cdn-link.com/upyours.js](https://cdn.jsdelivr.net/gh/tomsennett/UPYOURS@main/upyours.js)"></script>
No special setup is required beyond including the script.

Quick Start
Here's a simple example to get started:

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UPYOURS.js Example</title>
</head>
<body>
  <div id="moving-box" style="width: 50px; height: 50px; background-color: red;"></div>
  
  <script src="upyours.js"></script>
  <script>
    UPYOURS('#moving-box', function(el) {
      el.style.left = (parseInt(el.style.left || 0) + 1) + 'px';
    });
  </script>
</body>
</html>
This example creates a simple moving box that shifts to the right every frame.

API Reference
UPYOURS.js provides a minimal but powerful API:

UPYOURS(selector, updateFunction): This is the core function of the framework. It applies updateFunction to all elements matching the selector on every frame.
Parameters
selector: A CSS selector string to match elements in the DOM.
updateFunction: A function that takes a single parameter (el), representing each matched element. This function is called once per frame.
Tutorials and Demos
Explore more advanced features and common use cases of UPYOURS.js:

Simple Animation
Learn how to animate elements smoothly across the screen.

Interactive Elements
Discover how to create interactive elements that respond to user input.

Games
See how UPYOURS.js can be used to create simple browser-based games with real-time interactivity.

Each tutorial is designed to build your understanding incrementally, from basic principles to more complex applications.

Performance Benchmarks
UPYOURS.js is designed to be extremely lightweight, clocking in at around 500 lines of code. Here’s how it stacks up against other lightweight frameworks:

Memory Usage: Uses minimal memory, making it ideal for small-scale projects.
Execution Speed: The global update loop ensures that performance is consistent, even with multiple elements being updated simultaneously.
Community and Contributions
We welcome contributions! If you’d like to report a bug, request a feature, or contribute code, please visit our GitHub Issues page. You can also join the discussion or share your projects built with UPYOURS.js.

License
This project is licensed under the MIT License. See the LICENSE file for details.
