# mousePlugin

Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity. All listeners are bound to `window` and cleaned up automatically when the component is destroyed.

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { mousePlugin } from '@petit-kit/scoped/plugins';

define(
  'cursor-follower',
  { plugins: [mousePlugin()] },
  ({ onMouseMove, host }) => {
    onMouseMove((x, y) => {
      host.updateState({ cursorX: x, cursorY: y });
    });

    return () => `<div style="left: {cursorX}px; top: {cursorY}px">...</div>`;
  }
);
```

### Drag handling

```javascript
define(
  'draggable',
  { plugins: [mousePlugin()] },
  ({ onMouseDown, onMouseUp, onMouseMove }) => {
    onMouseDown((x, y, e) => {
      if (e.button === 0) startDrag(x, y);
    });
    onMouseUp(() => endDrag());
    onMouseMove((x, y) => updateDrag(x, y));

    return () => `<div>...</div>`;
  }
);
```

### Wheel / zoom

```javascript
onMouseWheel((x, y, deltaY) => {
  zoomLevel += deltaY > 0 ? -0.1 : 0.1;
});
```

## API

### `onMouseMove(handler)`

Subscribe to global mouse move. Returns an unsubscribe function.

```javascript
const stop = onMouseMove((x, y) => {
  console.log(`cursor at ${x}, ${y}`);
});
```

### `onMouseDown(handler)`

Subscribe to global mouse down. Returns an unsubscribe function.

```javascript
onMouseDown((x, y, e) => {
  if (e.button === 0) startDrag(x, y);
});
```

### `onMouseUp(handler)`

Subscribe to global mouse up. Returns an unsubscribe function.

### `onMouseWheel(handler)`

Subscribe to global wheel events. Returns an unsubscribe function.

```javascript
onMouseWheel((x, y, deltaY, event) => {
  // x, y: client coordinates
  // deltaY: scroll delta
  // event: native WheelEvent
});
```

Handlers receive:

- **Mouse events**: `(x, y, event)` – client coordinates and the native `MouseEvent`
- **Wheel events**: `(x, y, deltaY, event)` – client coordinates, scroll delta, and the native `WheelEvent`

All subscriptions are automatically cleaned up when the component is destroyed. Safe to use in SSR (no-op when `window` is undefined).
