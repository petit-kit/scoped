# morphPlugin

Provides idiomorph-based DOM morphing for efficient, non-destructive updates. Intercepts `innerHTML` writes on the component root so that every re-render after the initial mount patches the existing DOM in place instead of replacing it. This preserves focus, selection, scroll position and running CSS animations across re-renders.

The first render always uses native `innerHTML` for speed since there is no existing DOM state to preserve.

## Installation

```bash
pnpm add @petit-kit/scoped idiomorph
```

## Usage

```javascript
import { Idiomorph } from 'idiomorph';
import { define } from '@petit-kit/scoped';
import { morphPlugin } from '@petit-kit/scoped/plugins';

define(
  'c-counter',
  { plugins: [morphPlugin(() => Idiomorph)] },
  ({ state, actions, host }) => {
    state.count = 0;
    actions.increment = () => host.setState({ count: state.count + 1 });
    return () => `<button on:click="increment">Count: {count}</button>`;
  }
);
```

### With options

```javascript
define(
  'c-editor',
  {
    plugins: [morphPlugin(() => Idiomorph, { ignoreActiveValue: false })],
  },
  ({ host }) => {
    return () => `<textarea></textarea>`;
  }
);
```

## API

### `morphPlugin(getIdiomorph, options?)`

| Option              | Type      | Default | Description                                          |
| ------------------- | --------- | ------- | ---------------------------------------------------- |
| `ignoreActiveValue` | `boolean` | `true`  | Preserve the value of the focused input during morph |
| `callbacks`         | `object`  | —       | Additional callbacks forwarded to Idiomorph          |

### `morph(html)`

Morph the component root with the given HTML string. Typically used internally by Scoped; the plugin transparently intercepts re-renders.

```javascript
morph('<div class="updated">New content</div>');
```
