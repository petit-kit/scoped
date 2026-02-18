## Setup function

The `SetupFunction` is run only once on mount and should return a function that return a template string.

```typescript
({ host, props, state, actions, refs, link }) => {
  link('name', 'name)
  host.setState('date', new Date())

  actions.onMouseEnter = () => {
    console.log('mouseEnter')
  }

  return () => `
    <div
      ref='container'
      on:mouseEnter='onMouseEnter'
    >
      Hi ${props.name}, it's actually ${state.date}
    </div>
  `
}
```

`host` is the component itself, it got those methods:

| Method                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| **host.setState(partial)**    | Update state + full re-render              |
| **host.updateState(partial)** | Update state, effects only (no re-render)  |
| **host.setProps(partial)**    | Update props programmatically              |
| **host.scheduleUpdate()**     | Schedule effects on next RAF               |
| **host.update(fullRender)**   | Force update (full or partial)             |
| **host.forceRender()**        | Force re-render even if template unchanged |
| **host.destroy()**            | Clean up and run destroy callbacks         |
