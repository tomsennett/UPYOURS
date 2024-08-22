# UPYOURS

**UPYOURS** (short for "Update Yourself") is a lightweight JavaScript framework that lets you define update functions for HTML elements based on CSS selectors. Simply define a function for a CSS selector, and each frame, all matching elements will run that function. The same way you can mix and match CSS styles, you can do the same with JavaScript behaviors.

UPYOURS was inspired by game development engines like Unity and GameMaker, where systems are built around a global update loop. It's designed to be simple and lightweight, with no dependencies and no configuration. Just include the upyours.js file in your HTML, define your functions, and you're good to go. You don't need to learn any new syntax or magic words, and you don't need to muck up your markup with extra classes or attributes.

Ideal use cases for UPYOURS include prototyping, small projects, simple games, and any other situation where you want to add interactivity to a web page without having to write a lot of code or set up a complex framework.

## Key Features

- **Global Update Loop**: Continuously runs a global update loop using `requestAnimationFrame`, allowing elements to execute their own update code based on their CSS classes.
- **Simple Function Binding**: Attach JavaScript behaviors directly to CSS selectors, with each element running its code based on the selectors it matches.
- **Event Handling**: Events are tracked and stored frame-by-frame, allowing you to check for event states like `this.event_keydown` or `this.event_mousemove` directly within your update loop.

## Getting Started

### Installation

To start using UPYOURS, simply include the script tag in your HTML:

```html
<script src="https://cdn.jsdelivr.net/gh/tomsennett/UPYOURS/upyours.js"></script>
```
### Basic Setup

Define functions within the `UPYOURS` object, keyed by CSS selectors:

```javascript
 UPYOURS[".someClass"] = function()
 {
     //Code here will run every frame on all elements with the class 'someClass'
 }

UPYOURS[".anotherClass"] = function()
{
    //Code here will run every frame on all elements with the class 'anotherClass'
}
```

That's all you need to do. UPYOURS will initialize itself and run its update loop, including your defined functions for all elements matching the specified selectors.

## Guide

Find a rundown of UPYOURS basics, including how to work with element properties and events, here:
https://tomsennett.github.io/UPYOURS/

## Examples

Here are some examples demonstrating UPYOURS in action. The source HTML of each page contains all the associated JavaScript. They are styled with [Pico.css](https://picocss.com/).

- **[Calculator Example](https://tomsennett.github.io/UPYOURS/examples/calculator.html)**: Here, the ```.display``` element has a ```myText``` property which it is responsible for rendering. Each ```button``` is responsible for appending its number/operation to the ```.display``` element's ```myText``` property, and the ```.equals``` button is reponsible for commencing the evaluation of ```myText```.
- **[News Example](https://tomsennett.github.io/UPYOURS/examples/news.html)**: The ```input``` filter checkboxes are responsible for launching an async fetch request when clicked, storing the results in an array called ```rssData```. The ```.news-grid``` makes sure that there is a number of ```.news-item``` elements matching the number of items in rssData, whatever its current state. Each ```.news-item``` is responsible for grabbing its own data from rssData and rendering it. 
- **[Video Example](https://tomsennett.github.io/UPYOURS/examples/video.html)**
- **[Frogger Game Example](https://tomsennett.github.io/UPYOURS/examples/frogger.html)**

## Notices

- **In Active Development:** UPYOURS is generally untested and not guaranteed to play nice with any other framework, library, or platform.
- **Event Handling**: Each element handles its own events frame-by-frame. While this simplifies interactivity, it may lead to performance issues on pages with many elements.
- **Conflicts**: Be mindful of potential conflicts with other libraries or frameworks, especially those that also use `requestAnimationFrame`.

## About
UPYOURS was created by me, [Tom Sennett](https://wherecouldtom.be). I am an award-winning indie game designer, web developer, and artist. In my independent projects and in contract work, I often need to quickly stand up a web frontend that can do very basic tasks like handle input, pass data around, and change the state of things. Full frameworks like React and Vue are overkill, and even more streamlined solutions like Alpine and Svelte often bring more complexity than needed.

UPYOURS adopts a global update loop modeled after game engines like Unity and GameMaker. It leverages the built-in support and flexibility of CSS selectors so that you can declare very simply in JS to a set of elements "this is how you behave", similar to how CSS declares "this is how you look". In this way, you can combine simple behaviors into complex systems, and ensure elements function dynamically regardless of the state of themselves or the rest of the DOM.

## License

[MIT License](LICENSE)
