## Select

The `$` method lets you query elements inside your component's shadow or light DOM, returning either a single element or an array (if multiple elements match).

```typescript
define('c-my-component', {}, ({ $, host }) => {
  onMount(() => {
    const btn = $('button.primary'); // single element or null
    const items = $('.list-item'); // array when multiple match

    // From outside via host element:
    const el = document.querySelector('c-my-component'); // self
    const inner = el.$('.list-item'); // same API on host
  });

  return () => `<div>
    <button class="primary">OK</button>
    <span class="list-item">
      A
    </span>
    <span class="list-item">
      B
    </span>
  </div>`;
});
```
