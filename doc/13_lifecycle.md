## Lifecycle

Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.

| Method                   | Description              |
| ------------------------ | ------------------------ |
| **`onMount(cb)`**        | After mount              |
| **`onDestroy(cb)`**      | On destroy               |
| **`onUpdate(cb)`**       | After each update        |
| **`onBeforeUpdate(cb)`** | Before each update       |
| **`onFirstUpdate(cb)`**  | Once, after first render |
| **`onPropsChanged(cb)`** | When props change        |
