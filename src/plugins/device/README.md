# devicePlugin

Detects and reacts to device and input type changes. Subscribes to CSS media queries and fires handlers whenever the match state changes.

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { devicePlugin } from '@petit-kit/scoped/plugins';

define('my-component', { plugins: [devicePlugin()] }, ({ onMediaQuery }) => {
  const stop = onMediaQuery('(max-width: 768px)', (matches) => {
    console.log('mobile:', matches);
  });
  // later: stop(); // unsubscribe

  return () => `<div>...</div>`;
});
```

## API

### `onMediaQuery(query, handler, options?)`

Subscribe to a CSS media query. Returns an unsubscribe function.

| Option      | Type      | Default | Description                                       |
| ----------- | --------- | ------- | ------------------------------------------------- |
| `immediate` | `boolean` | `true`  | Call handler immediately with current match state |

```javascript
onMediaQuery('(prefers-reduced-motion: reduce)', (matches) => {
  if (matches) disableAnimations();
});
```

All subscriptions are automatically cleaned up when the component is destroyed. Safe to use in SSR (no-op when `window` or `matchMedia` is undefined).
