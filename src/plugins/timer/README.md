# timerPlugin

Adds easy interval, timeout, and requestAnimationFrame timers to your component logic. All timers are cleared automatically when the component is destroyed. The RAF loop supports optional FPS throttling for performance-sensitive animations.

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { timerPlugin } from '@petit-kit/scoped/plugins';

define('my-component', { plugins: [timerPlugin()] }, ({ timer, host }) => {
  timer.setTimeout(() => host.updateState({ ready: true }), 2000);

  const stop = timer.raf((time, deltaTime) => {
    host.updateState({ elapsed: time });
  });

  return () => `<div>{elapsed}</div>`;
});
```

## API

### `timer.setTimeout(cb, delay?, ...args)`

Scoped `setTimeout`. Cleared automatically on component destroy.

```javascript
const id = timer.setTimeout(() => doSomething(), 1000);
// or with args:
timer.setTimeout((a, b) => log(a, b), 500, 'hello', 42);
```

### `timer.setInterval(cb, delay?, ...args)`

Scoped `setInterval`. Cleared automatically on component destroy.

```javascript
timer.setInterval(() => tick(), 1000);
```

### `timer.raf(cb, fps?)`

RequestAnimationFrame loop. Optionally throttle to a target FPS. Returns an unsubscribe function to stop the loop early.

```javascript
const stop = timer.raf((time, deltaTime) => {
  position += velocity * (deltaTime / 1000);
});
// later: stop();
```

Throttle to 30 FPS:

```javascript
timer.raf((time, dt) => update(dt), 30);
```

The callback receives:

- `time` – High-resolution timestamp
- `deltaTime` – Time since last frame (ms)
