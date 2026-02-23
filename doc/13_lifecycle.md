## Lifecycle

Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.

| Method                   | Description               |
| ------------------------ | ------------------------- |
| **`onMount(cb)`**        | After mount               |
| **`onDestroy(cb)`**      | On destroy                |
| **`onUpdate(cb)`**       | After each update         |
| **`onBeforeUpdate(cb)`** | Before each update        |
| **`onFirstUpdate(cb)`**  | Once, after first render  |
| **`onPropsChanged(cb)`** | When props change         |
| **`shouldRender(cb)`**   | Conditionally skip render |

<br/>

### shouldRender

Register a predicate to conditionally skip full renders. When the callback returns `false`, the template is not executed and the DOM is not updated. Effects and `onUpdate` hooks still run.

The callback receives a context object:

| Property          | Type        | Description                                      |
| ----------------- | ----------- | ------------------------------------------------ |
| **`reason`**      | `string`    | `'mount'` \| `'props'` \| `'state'` \| `'force'` |
| **`changedKeys`** | `string[]?` | For props/state: which keys changed              |

<br />

```typescript
define('c-lazy-list', {}, ({ shouldRender, state, props }) => {
  state.paused = false;

  shouldRender((ctx) => {
    // Always render on props change
    if (ctx.reason === 'props') return true;
    // Skip state updates when tab is hidden (e.g. scroll position)
    if (ctx.reason === 'state' && document.visibilityState === 'hidden')
      return false;
    // Skip specific state keys
    if (ctx.reason === 'state' && ctx.changedKeys?.includes('scrollY'))
      return false;

    return state.paused;
  });

  return () => `<ul>${props.items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
});
```
