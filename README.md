<br />

<p align="center">
  <img src='https://github.com/petit-kit/scoped/blob/main/assets/logo.svg?raw=true' width="400px" />
</p>
<br />
<br />

# Scoped - 0.0.7

### A lightweight, framework-agnostic library for building web components with reactive state, bindings, lifecycle hooks, template-based rendering and plugins.

**4.2 Kb** Gzipped - **12.7kb** Minified

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
  - [Selection](#select)
- [Plugins](#plugins)
- [Happy](#happy)

<br />
<br />

# Installation

To install **Scoped**, you can use your favorite package manager.

```bash
npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped
```

# Getting started

To get started with **Scoped**, you can create a new component using the `define` function.

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

| Method                        | Description                                |
| ----------------------------- | ------------------------------------------ |
| **host.setState(partial)**    | Update state + full re-render              |
| **host.updateState(partial)** | Update state, effects only (no re-render)  |
| **host.setProps(partial)**    | Update props programmatically              |
| **host.scheduleUpdate()**     | Schedule effects on next RAF               |
| **host.update(fullRender)**   | Force update (full or partial)             |
| **host.forceRender()**        | Force re-render even if template unchanged |
| **host.destroy()**            | Clean up and run destroy callbacks         |

## Templating

Inside your setup function, you can return a function that uses template literals for HTML generation.

### Basic Example

```typescript
() => {
  return () => `
    <div>
      <h2>Hello, ${props.name}!</h2>
    </div>
  `;
};
```

### Dynamic Content

Interpolation with `${...}` gives you access to state, props, or anything in closure:

```typescript
() => {
  return () => `
    <ul>
      ${state.items
        .map(
          (item) => `
        <li>${item.title}</li>
      `
        )
        .join('')}
    </ul>
  `;
};
```

### XSS

When interpolating **user-provided** or untrusted content, use `escapeHtml` to prevent XSS. It escapes `&`, `<`, `>`, `"`, and `'` so the content is safe in HTML context.

```typescript
({ escapeHtml }) => {
  return () => `<span>${escapeHtml(userInput)}</span>`;
};
```

`escapeHtml` accepts any value (falsy values return empty string) and returns a string safe for HTML. Do **not** use it with content you control and intend as markup — for that, use `bind:html` instead.

### Event Handlers

Use `on:eventName="handler"` to bind events, where **handler** is a function from your **actions** object or setup context:

```typescript
({ actions }) => {
  actions.addThing = () => console.log('addThing');
  return () => `
    <button on:click="addThing">Add thing</button>
  `;
};
```

Arrow functions or direct expressions are not supported, you must use named action references.

### Referencing DOM Elements

Use the `ref` attribute to assign references:

```typescript
({ onMount, refs }) => {
  onMount(() => console.log(refs.inputElement));
  return () => `
    <input ref="inputElement" type="text"></input>
  `;
};
```

You can then access the element as `refs.inputEl` in your setup code or methods.

### Bindings

Bindings let you connect the value of a DOM property or attribute to your component's state or props, making the element update reactively when the state changes, and optionally syncing changes back to your state.

#### Supported Bindings

- `bind:text="stateKey"` - Binds textContent
- `bind:html="stateKey"` - Binds innerHTML
- `bind:value="stateKey"` — Binds the value property
- `bind:checked="isChecked"` — Binds the checked property of checkbox/radio
- `bind:prop="key"` — Generic property binding (any property, e.g. `bind:min`, `bind:max`)

<br />

```typescript
({ state }) => {
  state.textValue = 'Hello, world!';
  state.htmlValue = `<strong>Hello, world!</strong>`;
  state.isChecked = true;
  state.styleValue = `background-color: red;`;

  return () => `
    <p bind:text="textValue"></p>
    <p bind:html="htmlValue"></p>
    <input type="checkbox" bind:checked="isChecked">
    <div bind:style="styleValue"></div>
  `;
};
```

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

## Effects

Effects are functions that run in response to reactive changes and can be used for side effects, subscriptions, or manual cleanup logic within your components.

```typescript
({ effect }) => {
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
};
```

## Computed

Computed values are memoized values used to derive data from state or props and automatically update when their dependencies change.

```typescript
({ computed }) => {
  const fullName = computed(
    () => `${state.firstName} ${state.lastName}`, // getter
    () => [state.firstName, state.lastName] // dependencies
  );
  return () => `<p>Name: ${fullName()}</p>`;
};
```

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

## Event Delegation

`delegate` lets you efficiently handle events on descendants matching a selector:

```typescript
({ onMount, delegate }) => {
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
};
```

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

# Plugins

Scoped includes a set of optional plugins to extend or enhance component behavior. You can import any of these plugins and register them via the `plugins` option.

⏲ Document is working in progress

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

- **[pointerPlugin](src/plugins/pointer/README.md)**  
  Lerp mouse position

- **[localStoragePlugin](src/plugins/localstorage/README.md)**  
  Scoped localStorage API with optional key prefix and JSON serialization.

**Usage Example:**

```javascript
import { define, inViewPlugin, timerPlugin } from '@petit-kit/scoped';

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

# Happy

The `happy` method logs a friendly version and repo message to your console—call it in your app to show appreciation and support for Scoped!

```javascript
import { happy } from '@petit-kit/scoped';

happy(); // 🙂🙃🙂🙃🙂🙃🙂
```
