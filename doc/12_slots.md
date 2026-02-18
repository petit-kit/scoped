## Slots

Slots allow you to render children inside your custom element, making it easy to compose interfaces or pass in dynamic content.

By default, any child content placed inside your component tag will be rendered in the default slot:

```html
<c-my-component>
  <h2 slot="title">Title goes here</h2>
  <p slot="description">Some description or content.</p>
</c-my-component>
```

In your component template, use:

```typescript
define('my-card', {}, () => {
  return () => `
    <aside><slot name="title"></slot></aside>
    <main><slot name="description"></slot></main>
    <slot></slot>
  `;
});
```
