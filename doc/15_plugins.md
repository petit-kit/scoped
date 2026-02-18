# Plugins

Scoped includes a set of optional plugins to extend or enhance component behavior. You can import any of these plugins and register them via the `plugins` option.

⏲ Document is working in progress

**Available Plugins:**

- **[lerpPlugin](src/plugins/lerp/README.md) & [springPlugin](src/plugins/spring/README.md)**  
  Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by [@petit-kit/animate](https://github.com/petit-kit/animate). Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

- **[morphPlugin](src/plugins/morph/README.md)**  
  Provides idiomorph-based DOM morphing for efficient, non-destructive updates.

- **[devicePlugin](src/plugins/device/README.md)**  
  Detects and reacts to device and input type changes (e.g., pointer type, hover support).

- **[lenisPlugin](src/plugins/lenis/README.md)**  
  Integrates the [Lenis](https://github.com/studio-freight/lenis) smooth scrolling library.

- **[timerPlugin](src/plugins/timer/README.md)**  
  Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.

- **[windowPlugin](src/plugins/window/README.md)**  
  Supplies window-level utilities such as window resize and scroll event listeners.

- **[inViewPlugin](src/plugins/inview/README.md)**  
  Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).

- **[mousePlugin](src/plugins/mouse/README.md)**  
  Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.

- **[pointerPlugin](src/plugins/pointer/README.md)**  
  Lerp mouse position

**Usage Example:**

```javascript
import { define, inViewPlugin, timerPlugin } from '@petit-kit/scoped';

define(
  'my-component',
  {
    plugins: [inViewPlugin(), timerPlugin()],
  },
  ({ inView, timer }) => {
    // Use provided plugin APIs in your setup function
    // ...
  }
);
```

All plugins are tree-shakeable—import only what you need.

See each plugin's README (linked above) for API docs, options, and usage examples.
