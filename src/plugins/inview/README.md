# inViewPlugin

Detects when an element is within the viewport and triggers handlers. Uses `IntersectionObserver` for efficient, performant visibility detection.

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { inViewPlugin } from '@petit-kit/scoped/plugins';

define('c-example', { plugins: [inViewPlugin()] }, ({ onInView }) => {
  onInView((isInView) => {
    console.log('host in view:', isInView);
  });

  return () => `<div>...</div>`;
});
```

### Observe a specific element

```javascript
define(
  'c-section',
  { plugins: [inViewPlugin()] },
  ({ observeInView, refs, onMount }) => {
    onMount(() => {
      observeInView(
        refs.section,
        (isInView, entry) => {
          entry.target.toggleAttribute('data-inview', isInView);
        },
        { rootMargin: '0px 0px -20% 0px' }
      );
    });

    return () => `<section ref="section">...</section>`;
  }
);
```

## API

### `onInView(handler, options?)`

Observe the component host element. Returns an unsubscribe function.

### `observeInView(element, handler, options?)`

Observe a specific element (ref or any `Element`). Returns an unsubscribe function.

### Options

Extends `IntersectionObserverInit` plus:

| Option      | Type      | Default | Description                                 |
| ----------- | --------- | ------- | ------------------------------------------- |
| `immediate` | `boolean` | `true`  | Whether to fire the first observer callback |

Standard `IntersectionObserver` options (`root`, `rootMargin`, `threshold`) are supported:

```javascript
observeInView(
  el,
  (isInView, entry) => {
    el.classList.toggle('visible', isInView);
  },
  {
    rootMargin: '0px 0px -20% 0px',
    threshold: 0.5,
  }
);
```

The handler receives:

- `isInView` – Whether the element is intersecting
- `entry` – The `IntersectionObserverEntry`

All observers are automatically disconnected when the component is destroyed. Safe to use in SSR (no-op when `IntersectionObserver` is undefined).
