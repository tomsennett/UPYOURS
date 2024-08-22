# UPYOURS.js

**UPYOURS** (short for "Update Yourself") is a lightweight JavaScript framework designed to add dynamic interactivity to your web pages with minimal boilerplate and no custom syntax to learn. Inspired by game development principles, UPYOURS makes it easy to add and remove behaviors from elements by simply adding or removing CSS classes.

## Key Features

- **Global Update Loop**: Continuously runs a global update loop using `requestAnimationFrame`, allowing elements to execute their own update code based on their CSS classes.
- **Simple Function Binding**: Attach JavaScript behaviors directly to CSS selectors, with each element running its code based on the selectors it matches.
- **No New Syntax**: There’s no need to learn new syntaxes or paradigms. UPYOURS uses plain vanilla JavaScript, making it easy to integrate into existing projects.
- **Event Handling**: Events are tracked and stored frame-by-frame, allowing you to check for event states like `this.event_keydown` or `this.event_mousemove` directly within your update loop.

## Getting Started

### Installation

To start using UPYOURS, simply include the script tag in your HTML:

```html
<script src="path/to/upyours.js"></script>
