# lerpPlugin

Adds reactive linear interpolation for animating values with smooth, eased motion. Powered by [@petit-kit/animate](https://github.com/petit-kit/animate). Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

## Installation

```bash
pnpm add @petit-kit/scoped @petit-kit/animate
```

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { lerpPlugin } from '@petit-kit/scoped/plugins';

define(
  'my-component',
  { plugins: [lerpPlugin()] },
  ({ createLerp, runLerp, host }) => {
    const opacity = createLerp({ from: 0, to: 1, lerp: 0.2 });
    runLerp(opacity, (value) => host.updateState({ opacity: value }));

    return () => `<div bind:style="opacity: {opacity}"></div>`;
  }
);
```

## API

### `createLerp(options?)`

Create an independent lerp controller. Supports `number`, `number[]`, or `Record<string, number>` values.

```javascript
const lerpX = createLerp({ from: 0, to: 1, lerp: 0.2 });
lerpX.setTarget(1);
```

### `runLerp(controller, onUpdate, options?)`

Drive a lerp controller on the scoped timer RAF. Returns a cleanup function.

| Option         | Type      | Default | Description                                    |
| -------------- | --------- | ------- | ---------------------------------------------- |
| `fps`          | `number`  | —       | Throttle updates to target FPS                 |
| `immediate`    | `boolean` | `true`  | Call `onUpdate` immediately with current value |
| `stopWhenDone` | `boolean` | `true`  | Stop RAF loop when animation completes         |

```javascript
const opacity = createLerp({ from: 0, to: 1 });
const stop = runLerp(opacity, (value) => {
  host.updateState({ opacity: value });
});
// later: stop();
```

All runners are automatically cleaned up when the component is destroyed.
