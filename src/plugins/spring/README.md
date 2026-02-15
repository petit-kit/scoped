# springPlugin

Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by [@petit-kit/animate](https://github.com/petit-kit/animate). Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

## Installation

```bash
pnpm add @petit-kit/scoped @petit-kit/animate
```

## Usage

```javascript
import { define } from '@petit-kit/scoped';
import { springPlugin } from '@petit-kit/scoped/plugins';

define(
  'my-component',
  { plugins: [springPlugin()] },
  ({ createSpring, runSpring, host }) => {
    const scale = createSpring({ from: 0.8, to: 1, stiffness: 200 });
    runSpring(scale, (value) => host.updateState({ scale: value }));

    return () => `<div bind:style="transform: scale({scale})"></div>`;
  }
);
```

## API

### `createSpring(options?)`

Create an independent spring controller. Supports `number`, `number[]`, or `Record<string, number>` values.

```javascript
const springX = createSpring({ from: 0, to: 1, stiffness: 200 });
springX.setTarget(1);
```

### `runSpring(controller, onUpdate, options?)`

Drive a spring controller on the scoped timer RAF. Returns a cleanup function.

| Option         | Type      | Default | Description                                    |
| -------------- | --------- | ------- | ---------------------------------------------- |
| `fps`          | `number`  | —       | Throttle updates to target FPS                 |
| `immediate`    | `boolean` | `true`  | Call `onUpdate` immediately with current value |
| `stopWhenDone` | `boolean` | `true`  | Stop RAF loop when animation settles           |

```javascript
const scale = createSpring({ from: 0.8, to: 1 });
const stop = runSpring(scale, (value) => {
  host.updateState({ scale: value });
});
// later: stop();
```

All runners are automatically cleaned up when the component is destroyed.
