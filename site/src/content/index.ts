const content = [
  {
    Title: 'Introduction',
    content: `
      <strong>Scoped</strong> is a lightweight library designed to simplify the creation of web components.
      <br />
      <br />
      Its main idea is to provide a minimal, framework-agnostic layer over the Custom Elements API, letting you build encapsulated, reusable UI components using a concise template syntax, reactive state, and straightforward binding mechanisms. With built-in lifecycle hooks and an extensible plugin system, Scoped empowers developers to efficiently build modern, reactive interfaces.
      <br />
      <br />
      It encourages expressiveness and rapid prototyping, giving you fine-grained control and flexibility over your components without the overhead and complexity of traditional frameworks. Scoped lets you stay close to the platform while benefiting from reactivity, simple data flow, and composable patterns for creative and productive development.
    `,
  },
  {
    Title: 'Installation',
    content: `
      To install <strong>Scoped</strong>, you can use your favorite package manager.
      <br />
      <pre>
        <code class="language-bash">npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped</code>
      </pre>
    `,
  },
  {
    Title: 'Getting started',
    content: `
      To get started with <strong>Scoped</strong>, you can create a new component using the <strong>define</strong> function.
      <br />
      <pre>
        <code class="language-typescript">import { define } from '@petit-kit/scoped';

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

    return () => \` 
      &lt;div&gt;
        &lt;input
          type="range" min="0" max="100" step="1"
          bind:value="value"
          on:input="handleChange"
        /&gt;
        &lt;c-number ref="number" bind:value="value"&gt;&lt;/c-number&gt;
      &lt;/div&gt;
    \`;
  });</code>
    </pre>

    The <strong>define()</strong> function is used to declare a new component.
    <pre>
      <code class="language-typescript">function define(
  tagName: string,
  options: ComponentOptions,
  setup: SetupFunction
);</code>
      </pre>
      It takes a <strong>tagName</strong> for naming the used tag, I recommend to prefix it with <strong>c-</strong> before.
    `,
    children: [
      {
        Title: 'Component options',
        content: `
          The <strong>ComponentOptions</strong> is the options for the component:

          <pre>
            <code class="language-typescript">{
  props: {
    attributeName: {
      type: Number&#124;String&#124;Boolean,
      default: 0 // default value
    }
  },
  styles: \`c-slider { color: red; }\`,
  plugins: [lenisPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}</code>
          </pre>
        `,
      },
      {
        Title: 'Setup function',
        content: `
          The <strong>SetupFunction</strong> is run only once on mount and should return a function that return a template string.

          <pre>
            <code class="language-typescript">({ host, props, state, actions, refs, link }) => {
  link('name', 'name)
  host.setState('date', new Date())

  actions.onMouseEnter = () => {
    console.log('mouseEnter')
  }

  return () => \`
    &lt;div
      ref="container"
      on:mouseEnter="onMouseEnter"
    &gt;
      Hi \${props.name}, it\&apos;s actually \${state.date}
    &lt;/div&gt;
  \`;
}</code>
          </pre>

          <strong>host</strong> is the component itself, it got those methods:
          <br />
          <br />

          <table class="doc-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>host.setState(partial)</strong></td>
                <td>Update state + full re-render</td>
              </tr>
              <tr>
                <td><strong>host.updateState(partial)</strong></td>
                <td>Update state, effects only (no re-render)</td>
              </tr>
              <tr>
                <td><strong>host.setProps(partial)</strong></td>
                <td>Update props programmatically</td>
              </tr>
              <tr>
                <td><strong>host.scheduleUpdate()	</strong></td>
                <td>Schedule effects on next RAF</td>
              </tr>
              <tr>
                <td><strong>host.update(fullRender)</strong></td>
                <td>Force update (full or partial)</td>
              </tr>
              <tr>
                <td><strong>host.forceRender()</strong></td>
                <td>Force re-render even if template unchanged</td>
              </tr>
              <tr>
                <td><strong>host.destroy()</strong></td>
                <td>Clean up and run destroy callbacks</td>
              </tr>
              <tr>
                <td><strong>host.remove()</strong></td>
                <td>Remove the component from the DOM</td>
              </tr>
            </tbody>
          </table>
        `,
      },
      {
        Title: 'Templating',
        content: `
          Inside your setup function, you can return a function that uses template literals for HTML generation.

          <br />
          <br />
          <p class="sub-title-small">
            Basic Example
          </p>

          <pre>
            <code class="language-typescript">() => {
  return () => \`
    &lt;div&gt;
      &lt;h2&gt;Hello, \${props.name}!&lt;/h2&gt;
    &lt;/div&gt;
  \`;
}</code>
          </pre>

          <p class="sub-title-small">
            Dynamic Content
          </p>
          <br />

          Interpolation with <strong>\${...}</strong> gives you access to state, props, or anything in closure:

          <pre>
          <code class="language-typescript">() => {
  return () => \`
    &lt;ul&gt;
      \${state.items.map((item) => \`
        &lt;li&gt;\${item.title}&lt;/li&gt;
      \`).join('')}
    &lt;/ul&gt;
  \`;
}</code>
          </pre>

          <p class="sub-title-small">
            Event Handlers
          </p>
          <br />

          Use <strong>on:eventName="handler"</strong> to bind events, where <strong>handler</strong> is a function from your <strong>actions</strong> object or setup context:

          <pre>
            <code class="language-typescript">({ actions }) => {
  actions.addThing = () => console.log('addThing');
  return () => \`
    &lt;button on:click="addThing"&gt;Add thing&lt;/button&gt;
  \`;
}</code>
          </pre>

          Arrow functions or direct expressions are not supported; you must use named action references.

          <br />
          <br />
          <p class="sub-title-small">
            Referencing DOM Elements
          </p>
          <br />

          Use the <strong>ref</strong> attribute to assign references:

          <pre>
            <code class="language-typescript">({ onMount, refs }) => {
  onMount(() => console.log(refs.inputElement))
  return () => \`
    &lt;input ref="inputElement" type="text"&gt&lt;/input&gt
  \`;
}</code>
          </pre>

          You can then access the element as <strong>refs.inputElement</strong> in your setup code or methods.

          <br />
          <br />
          <p class="sub-title-small">
            Bindings
          </p>
          <br />

          Bindings let you connect the value of a DOM property or attribute to your component's state or props, making the element update reactively when the state changes, and optionally syncing changes back to your state.
          <br />
          <br />
          <strong>Supported Bindings:</strong>
          <br />
          <br />

          <div class="ml-4">
            <strong>bind:text="stateKey"</strong> - Binds textContent<br />
            <strong>bind:html="stateKey"</strong> - Binds innerHTML<br />
            <strong>bind:value="stateKey"</strong> — Binds the value property<br />
            <strong>bind:checked="isChecked"</strong> — Binds the checked property of checkbox/radio<br />
            <strong>bind:prop="key"</strong> — Generic property binding (any property, e.g. bind:min, bind:max)<br />
          </div>
          <br />

          <pre>
            <code class="language-typescript">({ state }) => {
  state.textValue = 'Hello, world!';
  state.htmlValue = \`&lt;strong&gt;Hello, world!&lt;/strong&gt;\`;
  state.isChecked = true;
  state.styleValue = \`background-color: red;\`;

  return () => \`
    &lt;p bind:text="textValue"&gt;&lt;/p&gt;
    &lt;p bind:html="htmlValue"&gt;&lt;/p&gt;
    &lt;input type="checkbox" bind:checked="isChecked"&gt;
    &lt;div bind:style="styleValue"&gt;&lt;/div&gt;
  \`;
}</code>
          </pre>
        `,
      },
      {
        Title: 'State & props',
        content: `
          <br />
          <p class="sub-title-small">
            State
          </p>
          <br />
          State is a plain object that belongs to your component instance. It is fully reactive and any time you update the state, your component can re-render or trigger effects.
          <br />
          <br />
          You can update state in two main ways:
          <br />
          <br />

          <div class="ml-4">
            <strong>host.setState(partial)</strong><br />
            Merges the partial state and triggers a full re-render.
            <br />
            <br />
            <strong>host.updateState(partial)</strong><br />
            Merges the partial state and only schedules effects/computed, but does NOT re-render the template.
            <br />
            <br />
          </div>

          <pre>
            <code class="language-typescript">// Initialize state in setup (no re-render)
state.count = 0;
state.status = 'idle';
            
// Initialize state in setup (optional)
host.setState({ count: 0, status: 'idle' });

// Update state & trigger re-render
actions.increment = () => {
  host.setState({ count: state.count + 1 });
};

// Only update state silently without re-render
host.updateState({ status: 'busy' });</code>
          </pre>
          State is always available via the <strong>state</strong> object you get in your setup function:
          <pre>
            <code class="language-typescript">({ state, host }) => {
  // Access current state values
  const current = state.count;
  // Set state
  host.setState({ count: current + 1 });
  // ...
};</code>
          </pre>

          <br />
          <p class="sub-title-small">
            Props
          </p>
          <br />
          Props are values passed into your custom element as attributes or via programmatic updates. You define prop types/defaults in <strong>props</strong> on the component options.
          <br />
          <br />
          Props are available as the <strong>props</strong> object in the setup function:
          <br />

          <pre>
            <code class="language-typescript">define(
  'c-my-component',
  {
    props: {
      value: { type: Number, default: 10 },
      label: { type: String, default: 'Untitled' },
    },
  },
  ({ props }) => {
    return () => \`
      &lt;p&gt;Value: \${props.value}&lt;/p&gt;
      <span>\${props.label}</span>
    \`;
  }
);</code>
          </pre>
          Props are always kept up to date with attribute changes, and updating props from the outside (or via <strong>host.setProps(...)</strong>) will trigger updates in your component.
          <br />
          <br />
          <strong>Two-way Binding:</strong>
          <br />
          <br />
          Scoped allows props <=> state syncing using the <strong>link</strong> helper:
          <br />
          <pre>
            <code class="language-typescript">({ link }) => {
  link('value', 'value'); // Binds prop 'value' with state 'value'
};</code>
          </pre>
          This makes sure that when <strong>props.value</strong> changes from outside, your state updates, and when you change <strong>state.value</strong>, the prop and attribute reflect if configured.
          <br />
          <br />
          <strong>Programmatic prop updates:</strong>
          <br />
          <br />
          You can also change props from inside or outside the component:
          <pre>
            <code class="language-typescript">host.setProps({ value: 42 });</code>
          </pre>
          This updates the prop, reflects it as an attribute if needed, and triggers all update lifecycle hooks.
          <br />
          <br />
          Props are also automatically parsed from their attribute string values into the appropriate type, based on your definition (Number, Boolean, etc.), so you always work with type-safe values in your setup and template logic.
          <br />
          <br />
          <strong>Setting large objects/arrays as props:</strong>
          <br />
          <br />
          You can set large objects/arrays as props by using the <strong>host.setProps(...)</strong> method:
          <pre>
            <code class="language-typescript">const component = document.querySelector('c-my-component');
component.setProps({ data: largeArray, config: complexObject });</code>
          </pre>
        `,
      },
      {
        Title: 'Effects',
        content: `
          Effects are functions that run in response to reactive changes and can be used for side effects, subscriptions, or manual cleanup logic within your components.
          <br />
          <pre>
            <code class="language-typescript">({ effect }) => {
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
};</code>
          </pre>
        `,
      },
      {
        Title: 'Computed',
        content: `
          Computed values are memoized values used to derive data from state or props and automatically update when their dependencies change.
          <br />
          <br />
          <pre>
            <code class="language-typescript">({ computed }) => {
  const fullName = computed(
    () => \`\${state.firstName} \${state.lastName}\`, // getter
    () => [state.firstName, state.lastName] // dependencies
  );
  return () => \`&lt;p&gt;Name: \${fullName()}&lt;/p&gt;\`;
};</code>
          </pre>
        `,
      },
      {
        Title: 'Custom events',
        content: `
          Custom events are a way to communicate between components.
          <br />
          <br />
          <p class="sub-title-small">
            Emit
          </p>
          <br />
          To emit a custom event from your component, use <strong>emit(name, detail?)</strong>:
          <pre>
            <code class="language-typescript">({ emit }) => {
  emit('my-event', { message: 'Hello from the component!' });
};</code>
          </pre>
          Listening to custom events in parent:
          <pre>
            <code class="language-javascript">const component = document.querySelector('c-my-component');
component.addEventListener('my-event', (e) => {
  console.log('Received:', e.detail.message);
});</code>
          </pre>

          <br />
          <p class="sub-title-small">
            Listen
          </p>
          <br />
          You can use <strong>listen</strong> to subscribe to events on any EventTarget (automatically cleaned up on destroy):
          <pre>
            <code class="language-typescript">({ listen }) => {
  listen(window, 'my-event', (e) => {
    console.log('Received:', e.detail.message);
  });
};</code>
          </pre>
        `,
      },
      {
        Title: 'Event delegation',
        content: `
          <strong>delegate</strong> lets you efficiently handle events on descendants matching a selector:
          <br />
          <br />
          <pre>
            <code class="language-typescript">({ onMount, delegate }) => {
  onMount(() => {
    delegate('click', '.item', (e, target) => {
      console.log('Clicked item:', target.textContent);
      target.classList.toggle('active');
    });
  });

  return () => \`
    &lt;ul&gt;
      &lt;li class="item"&gt;Apple&lt;/li&gt;
      &lt;li class="item"&gt;Banana&lt;/li&gt;
      &lt;li class="item"&gt;Cherry&lt;/li&gt;
    &lt;/ul&gt;
  \`;
}</code>
          </pre>
        `,
      },
      {
        Title: 'Slots',
        content: `
          Slots allow you to render children inside your custom element, making it easy to compose interfaces or pass in dynamic content.
          <br />
          <br />
          <strong>Basic Usage</strong>
          <br />
          <br />
          By default, any child content placed inside your component tag will be rendered in the default slot:
          <pre>
            <code class="language-html">&lt;my-card&gt;
  &lt;h2 slot="title"&gt;Title goes here&lt;/h2&gt;
  &lt;p slot="description"&gt;Some description or content.&lt;/p&gt;
&lt;/my-card&gt;</code>
          </pre>
          In your component:
          <br />
          <pre>
            <code class="language-typescript">define('my-card', {}, () => {
  return () => \`
    &lt;aside&gt;&lt;slot name="title"&gt;&lt;/slot&gt;&lt;/aside&gt;
    &lt;main&gt;&lt;slot name="description"&gt;&lt;/slot&gt;&lt;/main&gt;
    &lt;slot&gt;&lt;/slot&gt;
  \`;
});</code>
          </pre>
        `,
      },
      {
        Title: 'Lifecycle ',
        content: `
          Lifecycle hooks let you run code at specific moments in the component's life, such as mount, update, or destruction.
          <br />
          <br />
          <table class="doc-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>onMount(cb)</strong></td>
                <td>After mount</td>
              </tr>
              <tr>
                <td><strong>onDestroy(cb)</strong></td>
                <td>On destroy</td>
              </tr>
            <tbody>
              <tr>
                <td><strong>onUpdate(cb)</strong></td>
                <td>After each update</td>
              </tr>
              <tr>
                <td><strong>onBeforeUpdate(cb)</strong></td>
                <td>Before each update</td>
              </tr>
              <tr>
                <td><strong>onFirstUpdate(cb)</strong></td>
                <td>Once, after first render</td>
              </tr>
              <tr>
                <td><strong>onPropsChanged(cb)</strong></td>
                <td>When props change</td>
              </tr>
            </tbody>
          </table>
        `,
      },
    ],
  },
  {
    Title: 'Plugins',
    content: `
      Plugins are a way to extend the functionality of your component.
      <br />
      <br />
      <strong>Available Plugins:</strong>
      <br />
      <br />
      <div class="ml-4">
        <strong>lerpPlugin & springPlugin</strong> - Adds a reactive spring physics engine for animating values with natural, spring-like motion. Powered by <a href="https://github.com/petit-kit/animate">@petit-kit/animate</a>. Integrates seamlessly with the timer plugin for requestAnimationFrame-based updates.
        <br />
        <br />
        <strong>morphPlugin</strong> - Provides idiomorph-based DOM morphing for efficient, non-destructive updates.
        <br />
        <br />
        <strong>devicePlugin</strong> - Detects and reacts to device and input type changes (e.g., pointer type, hover support).
        <br />
        <br />
        <strong>lenisPlugin</strong> - Integrates the <a href="https://github.com/studio-freight/lenis">Lenis</a> smooth scrolling library.
        <br />
        <br />
        <strong>timerPlugin</strong> - Adds easy interval, timeout, and requestAnimationFrame timers to your component logic.
        <br />
        <br />
        <strong>windowPlugin</strong> - Supplies window-level utilities such as window resize and scroll event listeners.
        <br />
        <br />
        <strong>inViewPlugin</strong> - Detects when an element is within the viewport and triggers handlers (uses IntersectionObserver).
        <br />
        <br />
        <strong>mousePlugin</strong> - Tracks mouse position, mouse events, and allows you to listen to wheel/pointer activity.
        <br />
        <br />
        <strong>pointerPlugin</strong> - Lerp mouse position
      </div>
      <br />
      <strong class="italic">⏲ Document is working in progress</strong>
      <br />
      <br />
      <br />
      <p class="sub-title-small">
        Usage Example:
      </p>
      <br />
      <pre>
        <code class="language-typescript">import { define } from '@petit-kit/scoped';
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
);</code>
      </pre>
      All plugins are tree-shakeable—import only what you need.
      <br />
      <br />
      See each plugin's README for API docs, options, and usage examples.
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    `,
  },
];

export default content;
