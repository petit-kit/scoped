## Custom events

Custom events are a way to communicate between components.

### Emit

To emit a custom event from your component, use `emit(name, detail?)`:

```typescript
({ emit }) => {
  emit('my-event', { message: 'Hello from the component!' });
};
```

Listening to custom events in parent:

```javascript
const component = document.querySelector('c-my-component');
component.addEventListener('my-event', (e) => {
  console.log('Received:', e.detail.message);
});
```

### Listen

You can use `listen` to subscribe to events on any EventTarget (automatically cleaned up on destroy):

```typescript
({ listen }) => {
  listen(window, 'my-event', (e) => {
    console.log('Received:', e.detail.message);
  });
};
```
