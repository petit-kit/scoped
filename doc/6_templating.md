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
