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
```
### Basic Setup

Define functions within the `UPYOURS` object, keyed by CSS selectors:

```javascript
UPYOURS[".myClass"] = function() {
  // This code runs every frame for each element with the class 'myClass'
  console.log("Updating", this);
};
```

This will automatically apply the behavior to any element with the specified class.

### Example Usage

Here are some examples demonstrating what you can achieve with UPYOURS:

- **[Calculator Example](https://tomsennett.github.io/UPYOURS/examples/calculator.html)**
- **[News Example](https://tomsennett.github.io/UPYOURS/examples/news.html)**
- **[Video Example](https://tomsennett.github.io/UPYOURS/examples/video.html)**
- **[Frogger Game Example](https://tomsennett.github.io/UPYOURS/examples/frogger.html)**

## Performance Considerations

- **Event Handling**: Each element handles its own events frame-by-frame. While this simplifies interactivity, it may lead to performance issues on pages with many elements.
- **Conflicts**: Be mindful of potential conflicts with other libraries or frameworks, especially those that also use `requestAnimationFrame`.

## Error Handling

UPYOURS includes basic error handling within its core functions, but it’s recommended to implement your own error management as needed.

## Known Limitations

- **Complex Applications**: UPYOURS is not designed for large, complex applications. It excels in smaller projects where minimal setup and easy interactivity are key.

## Future Development

Currently, UPYOURS does not support custom events or extensions. Debugging is straightforward, relying on console logs and your usual debugging practices.

## License

[MIT License](LICENSE)
