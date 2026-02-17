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
        <code class="language-bash">
npm install @petit-kit/scoped
# or
yarn add @petit-kit/scoped
# or
pnpm install @petit-kit/scoped
        </code>
      </pre>
    `,
  },
  {
    Title: 'Getting started',
    content: `
      To get started with <strong>Scoped</strong>, you can create a new component using the <strong>define</strong> function.
      <br />
      <pre>
        <code class="language-typescript">
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
  }
);
      </code>
    </pre>

    The <strong>define()</strong> function is used to declare a new component.
    <pre>
      <code class="language-typescript">
function define(
  tagName: string,
  options: ComponentOptions,
  setup: SetupFunction
);
        </code>
      </pre>
      It takes a <strong>tagName</strong> for naming the used tag, I recommend to prefix it with <strong>c-</strong> before.
    `,
    children: [
      {
        Title: 'Component options',
        content: `
          The <strong>ComponentOptions</strong> is the options for the component:

          <pre>
            <code class="language-typescript">
{
  props: {
    attributeName: {
      type: Number&#124;String&#124;Boolean,
      default: 0 // default value
    }
  },
  styles: \`c-slider { color: red; }\`,
  plugins: [lenisPlugin()], // an array of plugins
  shadow: false // activate shadow DOM
}
            </code>
          </pre>
        `,
      },
      {
        Title: 'Setup function',
        content: `
          The <strong>SetupFunction</strong> is run only once on mount and should return a function that return a template string.

          <pre>
            <code class="language-typescript">
({ host, props, state, actions, refs, link }) => {
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
}
            </code>
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
          The <strong>Props</strong> are the properties for the component:
        `,
      },
    ],
  },
];

export default content;
