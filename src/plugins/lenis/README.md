# lenisPlugin

Integrates the [Lenis](https://github.com/studio-freight/lenis) smooth scrolling library. Wires components to Lenis scroll events so you can react to scroll position, velocity, direction, and progress.

## Installation

```bash
pnpm add @petit-kit/scoped lenis
```

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { lenisPlugin } from '@petit-kit/scoped/plugins';

// You need to provide a getter that returns the current Lenis instance
const lenisInstance = createLenis(); // your Lenis setup

define(
  'my-component',
  { plugins: [lenisPlugin(() => lenisInstance)] },
  ({ onLenisScroll }) => {
    const stop = onLenisScroll((event) => {
      console.log('scroll:', event.scroll);
      console.log('velocity:', event.velocity);
      console.log('progress:', event.progress);
    });

    return () => `<div>...</div>`;
  }
);
```

## API

### `lenisPlugin(getLenis)`

- `getLenis` – Function that returns the current Lenis instance (may be `null` or `undefined` before init)

### `onLenisScroll(handler)`

Subscribe to Lenis scroll events. Returns an unsubscribe function.

The handler receives a `LenisScrollEvent` with:

| Property    | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `scroll`    | `number` | Current scroll position        |
| `limit`     | `number` | Maximum scroll value           |
| `velocity`  | `number` | Scroll velocity                |
| `direction` | `number` | Scroll direction (-1, 0, or 1) |
| `progress`  | `number` | Scroll progress (0–1)          |

All subscriptions are automatically cleaned up when the component is destroyed.
