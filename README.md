<br />

<p align="center">
  <img src='https://github.com/petit-kit/scoped/blob/main/assets/logo.png?raw=true' width="400px" />
</p>
<br />
<br />

# Scoped - 0.0.1

### A lightweight, framework-agnostic library for building web components with reactive state, bindings, lifecycle hooks, template-based rendering and plugins.

**4.1 Kb** Gzipped - **12.7kb** Minified

<br />

**Scoped** is a lightweight library designed to simplify the creation of web components.

Its main idea is to provide a minimal, framework-agnostic layer over the Custom Elements API, letting you build encapsulated, reusable UI components using a concise template syntax, reactive state, and straightforward binding mechanisms. With built-in lifecycle hooks and an extensible plugin system, Scoped empowers developers to efficiently build modern, reactive interfaces.

It encourages expressiveness and rapid prototyping, giving you fine-grained control and flexibility over your components without the overhead and complexity of traditional frameworks. Scoped lets you stay close to the platform while benefiting from reactivity, simple data flow, and composable patterns for creative and productive development.

<br />

- [Installation](#installation)
- [Getting started](#getting-started)
  - [Component options](#component-options)
  - [Setup function](#setup-function)
  - [Templating](#templating)
  - [State & Props](#state--props)
  - [Effects](#effects)
  - [Computed](#computed)
  - [Custom events](#custom-events)
  - [Event Delegation](#event-delegation)
  - [Slots](#slots)
  - [Lifecycle](#lifecycle)
- [Plugins](#plugins)

<br />
<br />

# Installation

```bash
npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped
```

# Getting started

```javascript
import { define } from '@petit-kit/scoped';

define(
  'c-slider',
  {
    props: { value: { type: Number, default: 0 } },
  },
  ({ link, emit, actions, host }) => {
    link('value', 'value');

    actions.handleChange = (event) => {
      host.updateState({ value: event.target.valueAsNumber });
      emit('on-change', { value: event.target.valueAsNumber });
    };

    return () => `
    <div>
      <input
        type="range" min="0" max="100" step="1"
        bind:value="value"
        on:input="handleChange"
      />
      <c-number ref="number" bind:value="value"></c-number>
    </div>
  `;
  }
);
```

The `define()` function is used to declare a new component.

```typescript
function define(
  tagName: string,
  options: ComponentOptions,
  setup: SetupFunction
);
```

It takes a `tagName` for naming the used tag, I recommend to prefix it with `c-` before.

## Component options

For the `ComponentOptions` here the way to setup the component:

```javascript
{
  props: {
    attributeName: {
      type: Number|String|Boolean,
      default: 0 // default value
    }
  },
  styles: `c-slider { color: red; }`
  plugins: [timerPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}
```

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

| Method                      | Description                                |
| --------------------------- | ------------------------------------------ |
| `host.setState(partial)`    | Update state + full re-render              |
| `host.updateState(partial)` | Update state, effects only (no re-render)  |
| `host.setProps(partial)`    | Update props programmatically              |
| `host.scheduleUpdate()`     | Schedule effects on next RAF               |
| `host.update(fullRender)`   | Force update (full or partial)             |
| `host.forceRender()`        | Force re-render even if template unchanged |
| `host.destroy()`            | Clean up and run destroy callbacks         |

## Templating

Templates in this framework are just functions that return a string of HTML. Inside your setup function, you can return a function — known as the template function — that uses template literals for HTML generation.

### Basic Example

```typescript
return () => `
  <div>
    <h2>Hello, ${props.name}!</h2>
    <button on:click="actions.addThing">Add thing</button>
  </div>
`;
```

### Dynamic Content

Interpolation with `${...}` gives you access to state, props, or anything in closure:

```typescript
return () => `
  <ul>
    ${state.items.map((item) => `<li>${item.title}</li>`).join('')}
  </ul>
`;
```

### Event Handlers

Use `on:eventName="handler"` to bind events, where `handler` is a function from your `actions` object or setup context:

```typescript
return () => `
  <button on:click="actions.save">Save</button>
`;
```

Arrow functions or direct expressions are not supported; you must use named action references.

### Referencing DOM Elements

Use the `ref` attribute to assign references:

```typescript
return () => `
  <input ref="inputEl" type="text">
`;
```

You can then access the element as `refs.inputEl` in your setup code or methods.

### Bindings

Bindings let you connect the value of a DOM property or attribute to your component's state or props, making the element update reactively when the state changes, and optionally syncing changes back to your state.

#### Value Binding

For `<input>`, `<textarea>`, and `<select>`, use `bind:value="stateKey"` to bind the value to a property in your `state`. When the user edits the input, the component will automatically update that property.

```typescript
return () => `
  <input bind:value="message">
`;
```

#### Supported Bindings

- `bind:text="stateKey"` - Binds textContent
- `bind:html="stateKey"` - Binds innerHTML
- `bind:value="stateKey"` — Binds the value property
- `bind:checked="isChecked"` — Binds the checked property of checkbox/radio
- `bind:prop="key"` — Generic property binding (any property, e.g. `bind:min`, `bind:max`)

#### Example: Checkbox

```typescript
return () => `
  <input type="checkbox" bind:checked="done">
  <label>${state.done ? 'Complete' : 'Incomplete'}</label>
`;
```

## State & props

### State

State is a plain object that belongs to your component instance. It is fully reactive and any time you update the state, your component can re-render or trigger effects.

You can update state in two main ways:

- `host.setState(partial)`: Merges the partial state and triggers a full re-render.
- `host.updateState(partial)`: Merges the partial state and only schedules effects/computed, but does NOT re-render the template.

```typescript
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
  'c-my-thing',
  {
    props: {
      value: { type: Number, default: 10 },
      label: { type: String, default: 'Untitled' },
    },
  },
  ({ props }) => {
    return () => `
    <p>Value: ${props.value}</p>
    <span>${props.label}</span>
  `;
  }
);
```

Props are always kept up to date with attribute changes, and updating props from the outside (or via `host.setProps(...)`) will trigger updates in your component.

**Two-way Binding:**

Scoped allows props <=> state syncing using the `link` helper:

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

## Effects

Effects are functions that run in response to reactive changes and can be used for side effects, subscriptions, or manual cleanup logic within your components.

```typescript
// Run on every render
effect(() => console.log('Rendered'));

// Run once (empty deps)
effect(() => {
  const sub = api.subscribe();
  return () => sub.unsubscribe();
}, []);

// Run when deps change
effect(
  (deps) => console.log('Count:', deps[0]),
  () => [state.count]
);

// Manual cleanup
const cleanup = effect(() => {
  /* ... */
});
cleanup();
```

## Computed

Computed values are memoized values used to derive data from state or props and automatically update when their dependencies change.

```typescript
const fullName = computed(
  () => `${state.firstName} ${state.lastName}`,
  () => [state.firstName, state.lastName]
);
return () => `<p>Name: ${fullName()}</p>`;
```

## Custom events

### Emit

To emit a custom event from your component, use `emit(name, detail?)`:

```typescript
actions.handleButtonClick = () => {
  host.emit('my-event', { message: 'Hello from the component!' });
};

return () => `<button on:click="handleButtonClick">Emit Event</button>`;
```

**Listening to custom events in parent:**

```javascript
<my-component id="c1"></my-component>
<script>
  document.getElementById('c1').addEventListener('my-event', (e) => {
    console.log('Received:', e.detail.message);
  });
</script>
```

### Listen

You can use `listen` to subscribe to events on any EventTarget (automatically cleaned up on destroy):

```typescript
onMount(() => {
  // Listen to a custom event emitted by another component
  listen(
    someOtherElement, // can be `window`
    'my-event',
    (e) => {
      console.log('Got custom event with detail:', e.detail);
    }
  );
});
```

---

### Event Delegation

`delegate` lets you efficiently handle events on descendants matching a selector:

```typescript
onMount(() => {
  delegate('click', '.item', (e, target) => {
    console.log('Clicked item:', target.textContent);
    target.classList.toggle('active');
  });
});

return () => `
  <ul>
    <li class="item">Apple</li>
    <li class="item">Banana</li>
    <li class="item">Cherry</li>
  </ul>
`;
```

## Slots

Slots allow you to render children inside your custom element, making it easy to compose interfaces or pass in dynamic content.

### Basic Usage

By default, any child content placed inside your component tag will be rendered in the default slot:

```html
<my-card>
  <h2>Title goes here</h2>
  <p>Some description or content.</p>
</my-card>
```

In your component template, use:

```typescript
return () => `
  <div class="card">
    <slot></slot> <!-- default slot -->
  </div>
`;
```

### Named Slots

Named slots let your users provide content for specific areas:

```html
<my-layout>
  <div slot="sidebar">Sidebar content</div>
  <div slot="main">Main content</div>
</my-layout>
```

In your component:

```typescript
return () => `
  <aside><slot name="sidebar"></slot></aside>
  <main><slot name="main"></slot></main>
`;
```

## Lifecycle

Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.

| Method               | Description              |
| -------------------- | ------------------------ |
| `onMount(cb)`        | After mount              |
| `onDestroy(cb)`      | On destroy               |
| `onUpdate(cb)`       | After each update        |
| `onBeforeUpdate(cb)` | Before each update       |
| `onFirstUpdate(cb)`  | Once, after first render |
| `onPropsChanged(cb)` | When props change        |

# Plugins

Scoped includes a set of optional plugins to extend or enhance component behavior. You can import any of these plugins and register them via the `plugins` option or the `use()` method.

**Available Plugins:**

- **[lerpPlugin](src/plugins/lerp/README.md) & [springPlugin](src/plugins/spring/README.md)**  
  Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by [@petit-kit/animate](https://github.com/petit-kit/animate). Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.

- **[morphPlugin](src/plugins/morph/README.md)**  
  Provides idiomorph-based DOM morphing for efficient, non-destructive updates.

- **[devicePlugin](src/plugins/device/README.md)**  
  Detects and reacts to device and input type changes (e.g., pointer type, hover support).

- **[lenisPlugin](src/plugins/lenis/README.md)**  
  Integrates the [Lenis](https://github.com/studio-freight/lenis) smooth scrolling library.

- **[timerPlugin](src/plugins/timer/README.md)**  
  Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.

- **[windowPlugin](src/plugins/window/README.md)**  
  Supplies window-level utilities such as window resize and scroll event listeners.

- **[inViewPlugin](src/plugins/inview/README.md)**  
  Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).

- **[mousePlugin](src/plugins/mouse/README.md)**  
  Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.

**Usage Example:**

```javascript
import { define } from '@petit-kit/scoped';
import { inViewPlugin, timerPlugin } from '@petit-kit/scoped/plugins';

define(
  'my-component',
  {
    plugins: [inViewPlugin(), timerPlugin()],
  },
  ({ inView, timer }) => {
    // Use provided plugin APIs in your setup function
    // ...
  }
);
```

All plugins are tree-shakeable—import only what you need.

See each plugin's README (linked above) for API docs, options, and usage examples.
