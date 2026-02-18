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
