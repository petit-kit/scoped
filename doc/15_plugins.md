# Plugins

Scoped includes a set of optional plugins to extend or enhance component behavior. You can import any of these plugins and register them via the `plugins` option.

⏲ Document is working in progress

**Available Plugins:**

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/lerp/README.md" target="_blank">lerpPlugin</a> & <a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/spring/README.md" target="_blank">springPlugin</a>**  
  Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by <a href="https://github.com/petit-kit/animate" target="_blank">@petit-kit/animate</a>. Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/morph/README.md" target="_blank">morphPlugin</a>**  
  Provides idiomorph-based DOM morphing for efficient, non-destructive updates.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/device/README.md" target="_blank">devicePlugin</a>**  
  Detects and reacts to device and input type changes (e.g., pointer type, hover support).

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/lenis/README.md" target="_blank">lenisPlugin</a>**  
  Integrates the <a href="https://github.com/studio-freight/lenis" target="_blank">Lenis</a> smooth scrolling library.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/timer/README.md" target="_blank">timerPlugin</a>**  
  Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/window/README.md" target="_blank">windowPlugin</a>**  
  Supplies window-level utilities such as window resize and scroll event listeners.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/inview/README.md" target="_blank">inViewPlugin</a>**  
  Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/mouse/README.md" target="_blank">mousePlugin</a>**  
  Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/pointer/README.md" target="_blank">pointerPlugin</a>**  
  Lerp mouse position

- **<a href="https://github.com/petit-kit/scoped/tree/main/src/plugins/localstorage/README.md" target="_blank">localStoragePlugin</a>**  
  Scoped localStorage API with optional key prefix and JSON serialization.

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
