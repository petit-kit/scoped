# localStoragePlugin

Provides a scoped localStorage API with optional key prefixing and automatic JSON serialization. Safe when `window` is undefined (SSR).

## Usage

```javascript
import { define, localStoragePlugin } from '@petit-kit/scoped';

define(
  'c-settings',
  { plugins: [localStoragePlugin()] },
  ({ storage, state, actions }) => {
    state.theme = storage.get('theme') ?? 'dark';
    actions.toggleTheme = () => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      storage.set('theme', next);
      state.theme = next;
    };
    return () => `<div class="{theme}">...</div>`;
  }
);
```

### With options

```javascript
define(
  'c-preferences',
  {
    plugins: [localStoragePlugin({ prefix: 'app', json: true })],
  },
  ({ storage }) => {
    const prefs = storage.get('prefs') ?? { fontSize: 14 };
    return () => `...`;
  }
);
```

## API

### `localStoragePlugin(options?)`

| Option   | Type      | Default | Description                               |
| -------- | --------- | ------- | ----------------------------------------- |
| `prefix` | `string`  | `''`    | Key prefix for namespacing (e.g. `'app'`) |
| `json`   | `boolean` | `true`  | JSON-serialize/parse values automatically |

### `storage`

| Method            | Description                                                   |
| ----------------- | ------------------------------------------------------------- |
| `get(key)`        | Get value by key. Returns `undefined` if not found.           |
| `set(key, value)` | Set value. Serialized when `json` is true.                    |
| `remove(key)`     | Remove a key.                                                 |
| `clear()`         | Clear all keys with this plugin's prefix. No-op if no prefix. |
