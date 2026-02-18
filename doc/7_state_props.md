## State & props

### State

State is a plain object that belongs to your component instance. It is fully reactive and any time you update the state, your component can re-render or trigger effects.

You can update state in two main ways:

- `host.setState(partial)` - Merges the partial state and triggers a full re-render.
- `host.updateState(partial)` - Merges the partial state and only schedules effects/computed, but does **NOT** re-render the template.

```typescript
// Initialize state in setup (no re-render)
state.count = 0;
state.status = 'idle';

// Initialize state in setup (optional)
host.setState({ count: 0, status: 'idle' });

// Update state & trigger re-render
actions.increment = () => {
  host.setState({ count: state.count + 1 });
};

// Only update state silently without re-render
host.updateState({ status: 'busy' });
```

State is always available via the `state` object you get in your setup function:

```typescript
({ state, host }) => {
  // Access current state values
  const current = state.count;
  // Set state
  host.setState({ count: current + 1 });
  // ...
};
```

### Props

Props are values passed into your custom element as attributes or via programmatic updates. You define prop types/defaults in `props` on the component options.

Props are available as the `props` object in the setup function:

```javascript
define(
  'c-my-component',
  {
    props: {
      value: { type: Number, default: 10 },
      label: { type: String, default: 'Untitled' },
    },
  },
  ({ props }) => {
    return () => `
      <p>Value: ${props.value}</p>
      ${props.label}
    `;
  }
);
```

Props are always kept up to date with attribute changes, and updating props from the outside (or via `host.setProps(...)`) will trigger updates in your component.

**Two-way Binding:**

Scoped allows **props** ↔️ **state** syncing using the `link` helper:

```typescript
({ link }) => {
  link('value', 'value'); // Binds prop 'value' with state 'value'
};
```

This makes sure that when `props.value` changes from outside, your state updates, and when you change `state.value`, the prop and attribute reflect if configured.

**Programmatic prop updates:**

You can also change props from inside the component:

```typescript
host.setProps({ value: 42 });
```

This updates the prop, reflects it as an attribute if needed, and triggers all update lifecycle hooks.

Props are also automatically parsed from their attribute string values into the appropriate type, based on your definition (Number, Boolean, etc.), so you always work with type-safe values in your setup and template logic.

**Setting large objects/arrays as props:**

You can set large objects/arrays as props by using the `host.setProps(...)` method:

```typescript
const component = document.querySelector('c-my-component');
component.setProps({ data: largeArray, config: complexObject });
```
