# windowPlugin

Supplies window-level utilities such as window resize and scroll event listeners. Provides two resize strategies: viewport-only (via `resize` events) and layout-aware (via `ResizeObserver` on `<html>`).

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { windowPlugin } from '@petit-kit/scoped/plugins';

define(
  'my-component',
  { plugins: [windowPlugin()] },
  ({ onViewportResize, onWindowResize }) => {
    onViewportResize((width, height) => {
      console.log('viewport', width, height);
    });

    const stop = onWindowResize((width, height) => {
      console.log('window', width, height);
    });
    // later: stop();

    return () => `<div>...</div>`;
  }
);
```

## API

### `onViewportResize(handler, options?)`

Uses window `resize` events. Best for viewport-only changes (e.g. responsive breakpoints).

| Option      | Type      | Default | Description                                      |
| ----------- | --------- | ------- | ------------------------------------------------ |
| `immediate` | `boolean` | `true`  | Call handler immediately with current dimensions |

```javascript
onViewportResize((width, height, event) => {
  if (width < 768) switchToMobileLayout();
});
```

### `onWindowResize(handler, options?)`

Uses `ResizeObserver` on `<html>`. Captures layout changes that affect size even when no window `resize` event fires (e.g. scrollbars appearing/disappearing).

| Option      | Type      | Default | Description                                      |
| ----------- | --------- | ------- | ------------------------------------------------ |
| `immediate` | `boolean` | `true`  | Call handler immediately with current dimensions |

```javascript
onWindowResize((width, height, event) => {
  // event is ResizeObserverEntry or UIEvent
});
```

Falls back to `onViewportResize` when `ResizeObserver` is not supported.

All subscriptions are automatically cleaned up when the component is destroyed. Safe to use in SSR (no-op when `window` is undefined).
