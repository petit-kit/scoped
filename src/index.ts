export * from './plugins';

/**
 * Scope - A lightweight, framework-agnostic library for building web components
 *
 * @module scope
 * @version 0.0.6
 * @description Provides a minimal abstraction over Custom Elements API, making it easy
 * to create reusable, encapsulated components with reactive state, lifecycle hooks,
 * and a simple template-based rendering system.
 *
 * @example Basic component
 * ```javascript
 * import { define } from './scope.js';
 *
  * define("c-slider", {
 *   props: { value: { type: Number, default: 0 } }
 * }, ({ link, emit, actions, host }) => {
 *   link("value", "value")
 * 
 *   actions.handleChange = event => {
 *     host.updateState({ value: event.target.valueAsNumber })
 *     emit("on-change", { value: event.target.valueAsNumber })
 *   }
 * 
 *   return () => `
 *     <div>
 *       <input
 *         type="range"
 *         min="0" max="100" step="1"
 *         bind:value="value"
 *         on:input="handleChange"
 *       />
 *       <c-number ref="number" bind:value="value"></c-number>
 *     </div>
 *   `
 * })

 * ```
 *
 * @example Component with shadow DOM
 * ```javascript
 * define('styled-button', {
 *   shadow: true,
 *   styles: 'button { background: blue; color: white; }'
 * }, () => {
 *   return () => '<button>Click me</button>';
 * });
 * ```
 *
 * @see {@link ComponentContext} for available context properties
 * @see {@link ComponentOptions} for configuration options
 */

/**
 * Library version.
 *
 * @constant {string}
 */
const SCOPE_VERSION = '0.0.6';

/**
 * Logs version and repository info for @petit-kit/scoped.
 * Useful for debugging or confirming library presence.
 */
export const happy = () => {
  console.info(
    'The website is using @petit-kit/scoped v' + SCOPE_VERSION,
    '\nhttps://github.com/petit-kit/scoped'
  );
};

/**
 * Scoped template interpolation pattern.
 *
 * Matches `{key}` in template strings and replaces it with values from
 * `state` and `props` (state wins if both exist).
 *
 * @constant {RegExp}
 * @internal
 */
const interpolationPattern = /\{([A-Za-z_$][\w$]*)\}/g;

/**
 * Prefix for one-way bindings in templates.
 *
 * Examples:
 * - `bind:value="value"` -> sets element.value + reflects attribute
 * - `bind:text="label"` -> sets textContent
 * - `bind:html="markup"` -> sets innerHTML
 *
 * @example Bind input value
 * ```typescript
 * return () => `
 *   <input type="text" bind:value="name" />
 *   <p bind:text="name"></p>
 * `;
 * ```
 *
 * @example Bind inner HTML
 * ```typescript
 * return () => `<div bind:html="markup"></div>`;
 * ```
 *
 * @constant {string}
 * @internal
 */
const bindPrefix = 'bind:';

/**
 * Supported prop types for type checking and parsing
 *
 * @typedef {StringConstructor|NumberConstructor|BooleanConstructor|ObjectConstructor|ArrayConstructor} PropType
 */
export type PropType =
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | ObjectConstructor
  | ArrayConstructor;

/**
 * Definition for a single prop, including type, default value, and reflection behavior
 *
 * @template T - The type of the prop value
 * @interface PropDefinition
 *
 * @example
 * ```typescript
 * const propDef: PropDefinition<number> = {
 *   type: Number,
 *   default: 0,
 *   reflect: true
 * };
 * ```
 */
export interface PropDefinition<T = any> {
  /**
   * Type constructor for parsing the prop value from attributes
   * @type {PropType}
   */
  type?: PropType;
  /**
   * Default value if prop is not provided
   * @type {T}
   */
  default?: T;
  /**
   * Whether to reflect prop changes back to HTML attributes
   * @type {boolean}
   * @default false
   */
  reflect?: boolean;
}

/**
 * Props definition object mapping prop names to their definitions or default values
 *
 * @typedef {Record<string, PropDefinition | any>} PropsDefinition
 *
 * @example
 * ```typescript
 * const props: PropsDefinition = {
 *   count: { type: Number, default: 0 },
 *   name: { type: String, default: 'World' },
 *   active: { type: Boolean, default: false }
 * };
 * ```
 */
export type PropsDefinition = Record<string, PropDefinition | any>;

/**
 * Plugin for extending the component context.
 */
export type ComponentPlugin<Ext extends Record<string, any> = {}> = {
  /** Optional plugin name for debugging */
  name?: string;
  /**
   * Extend the component context with new capabilities.
   */
  extend: (
    context: ComponentContextBase<any, any, any, any>,
    host: ComponentHost
  ) => Ext;
};

/**
 * Options for component definition
 *
 * @interface ComponentOptions
 *
 * @example
 * ```typescript
 * const options: ComponentOptions = {
 *   props: { count: { type: Number, default: 0 } },
 *   shadow: true,
 *   styles: 'div { color: red; }'
 * };
 * ```
 */
export interface ComponentOptions<
  Plugins extends readonly ComponentPlugin<any>[] = ComponentPlugin<any>[],
> {
  /**
   * Prop definitions for the component
   * @type {PropsDefinition}
   */
  props?: PropsDefinition;
  /**
   * Whether to use Shadow DOM (default: false, uses light DOM)
   * @type {boolean}
   * @default false
   */
  shadow?: boolean;
  /**
   * CSS styles to inject into document head (for shadow DOM components)
   * @type {string}
   */
  styles?: string;
  /**
   * Plugins that extend the component context.
   * @type {Plugins}
   */
  plugins?: Plugins;
}

/**
 * Methods available on the component host element
 *
 * @interface ComponentHost
 *
 * @example
 * ```typescript
 * define('my-component', {}, ({ host }) => {
 *   host.setState({ count: 5 });
 *   host.updateState({ scrollY: 100 });
 *   host.setProps({ title: 'New Title' });
 * });
 * ```
 */
export interface ComponentHost {
  /**
   * Update state and trigger full re-render
   * @method setState
   * @param {Partial<State>} partial - Partial state object to merge
   * @template State
   *
   * @example
   * ```typescript
   * host.setState({ count: 5, name: 'Updated' });
   * ```
   */
  setState: <State>(partial: Partial<State>) => void;
  /**
   * Update state without re-render (triggers effects only)
   * @method updateState
   * @param {Partial<State>} partial - Partial state object to merge
   * @template State
   *
   * @example
   * ```typescript
   * // Update scroll position without re-rendering
   * host.updateState({ scrollY: window.scrollY });
   * ```
   */
  updateState: <State>(partial: Partial<State>) => void;
  /**
   * Update props programmatically
   * @method setProps
   * @param {Partial<Props>} partial - Partial props object to merge
   * @template Props
   *
   * @example
   * ```typescript
   * // Pass large data (recommended for objects/arrays)
   * element.setProps({ data: largeArray, config: complexObject });
   * ```
   */
  setProps: <Props>(partial: Partial<Props>) => void;
  /**
   * Schedule a partial update (effects only)
   * @method scheduleUpdate
   *
   * @example
   * ```typescript
   * host.scheduleUpdate(); // Runs effects on next animation frame
   * ```
   */
  scheduleUpdate: () => void;
  /**
   * Force an update (full or partial render)
   * @method update
   * @param {boolean} fullRender - Whether to perform full render or effects only
   *
   * @example
   * ```typescript
   * host.update(true);  // Full render
   * host.update(false); // Effects only
   * ```
   */
  update: (fullRender: boolean) => void;
  /**
   * Force a full re-render even if template is unchanged
   * @method forceRender
   *
   * @example
   * ```typescript
   * host.forceRender(); // Forces DOM update even if template string matches
   * ```
   */
  forceRender: () => void;
  /**
   * Clean up component and run destroy callbacks
   * @method destroy
   *
   * @example
   * ```typescript
   * host.destroy(); // Cleans up effects, events, and runs onDestroy hooks
   * ```
   */
  destroy: () => void;
  /**
   * Remove the component from the DOM
   * @method remove
   *
   * @example
   * ```typescript
   * host.remove(); // Removes element and triggers cleanup via disconnectedCallback
   * ```
   */
  remove: () => void;
  /**
   * Select DOM elements within the component.
   * Returns a single element, or an array of elements if multiple match.
   * @method $
   * @param {string} selector - CSS selector to match elements
   * @returns {Element | Element[] | null} Single element, array of elements, or null if none match
   *
   * @example
   * ```typescript
   * const btn = host.$('button.primary');        // single element or null
   * const items = host.$('.list-item');          // array when multiple match
   * const first = Array.isArray(items) ? items[0] : items;
   * ```
   */
  $: (selector: string) => Element | Element[] | null;
}

/**
 * Context object passed to the setup function, providing access to component APIs
 *
 * @template Props - Type of component props
 * @template State - Type of component state
 * @template Actions - Type of action methods
 * @template Refs - Type of DOM refs
 * @interface ComponentContext
 *
 * @example Basic usage
 * ```typescript
 * define('counter', {}, ({ props, state, actions, host }) => {
 *   state.count = 0;
 *   actions.increment = () => host.setState({ count: state.count + 1 });
 *   return () => `<div>${state.count}</div>`;
 * });
 * ```
 *
 * @example With lifecycle hooks
 * ```typescript
 * define('component', {}, ({ onMount, onDestroy, effect }) => {
 *   onMount(() => console.log('Mounted'));
 *   onDestroy(() => console.log('Destroyed'));
 *   effect((deps) => {
 *     const timer = setInterval(() => {}, 1000);
 *     return () => clearInterval(timer);
 *   }, []);
 *   return () => '<div>Hello</div>';
 * });
 * ```
 *
 * @see {@link ComponentHost} for host methods
 * @see {@link ComponentOptions} for component configuration
 */
export interface ComponentContextBase<
  Props = Record<string, any>,
  State = Record<string, any>,
  Actions = Record<string, Function>,
  Refs = Record<string, HTMLElement | HTMLElement[]>,
> {
  /**
   * Component props (read-only, updated via attributes or setProps)
   * @type {Props}
   * @readonly
   */
  props: Props;
  /**
   * Component state (mutable, updated via setState/updateState)
   * @type {State}
   */
  state: State;
  /**
   * Action methods that can be called from event handlers
   * @type {Actions}
   *
   * @example
   * ```typescript
   * actions.handleClick = () => { /* ... *\/ };
   * // Use in template: <button on:click="handleClick">
   * ```
   */
  actions: Actions;
  /**
   * DOM element references (populated after render)
   * @type {Refs}
   *
   * @example
   * ```typescript
   * // In template: <div ref="myDiv"></div>
   * // Access: refs.myDiv
   * ```
   */
  refs: Refs;
  /**
   * Emit custom events that bubble up the DOM tree
   * @method emit
   * @param {string} name - Event name
   * @param {any} [detail] - Optional event detail data
   *
   * @example
   * ```typescript
   * emit('item-clicked', { id: 123, name: 'Item' });
   * ```
   */
  emit: (name: string, detail?: any) => void;
  /**
   * Listen to a custom event from a given target
   * @method listen
   * @param {EventTarget} target - Target to attach the listener to
   * @param {string} name - Custom event name to listen for
   * @param {function(CustomEvent): void} handler - Event handler
   * @param {AddEventListenerOptions} [options] - Listener options
   * @returns {() => void} Cleanup function to remove the listener
   *
   * @example
   * ```typescript
   * const cleanup = listen(window, 'theme-change', (e) => {
   *   console.log(e.detail);
   * });
   * ```
   */
  listen: (
    target: EventTarget,
    name: string,
    handler: (event: CustomEvent<any>) => void,
    options?: AddEventListenerOptions
  ) => () => void;
  /**
   * Update state without triggering a re-render (triggers effects only)
   * @method updateState
   * @param {Partial<State>} partial - Partial state object to merge
   *
   * @example
   * ```typescript
   * updateState({ count: 5 }); // Updates state, runs effects, but doesn't re-render
   * ```
   */
  updateState: (partial: Partial<State>) => void;
  /**
   * Select DOM elements within the component.
   * Returns a single element, or an iterable array if multiple match.
   * @method $
   * @param {string} selector - CSS selector to match elements
   * @returns {Element | Element[] | null} Single element, array of elements, or null if none match
   *
   * @example
   * ```typescript
   * const btn = $('button.primary');        // single element or null
   * const items = $('.list-item');          // array when multiple match
   * for (const el of Array.isArray(items) ? items : (items ? [items] : [])) { ... }
   * ```
   */
  $: (selector: string) => Element | Element[] | null;
  /**
   * The component host element with all host methods
   * @type {HTMLElement & ComponentHost}
   *
   * @see {@link ComponentHost}
   */
  host: HTMLElement & ComponentHost;
  /**
   * Register callback to run after component is mounted
   * @method onMount
   * @param {function(): void} callback - Callback function
   */
  onMount: (callback: () => void) => void;
  /**
   * Register callback to run when component is destroyed
   * @method onDestroy
   * @param {function(): void} callback - Callback function
   */
  onDestroy: (callback: () => void) => void;
  /**
   * Register callback to run after each update/re-render
   * @method onUpdate
   * @param {function(): void} callback - Callback function
   */
  onUpdate: (callback: () => void) => void;
  /**
   * Register callback to run before each update/re-render
   * @method onBeforeUpdate
   * @param {function(): void} callback - Callback function
   */
  onBeforeUpdate: (callback: () => void) => void;
  /**
   * Register callback to run only on the first update (after mount)
   * @method onFirstUpdate
   * @param {function(): void} callback - Callback function
   */
  onFirstUpdate: (callback: () => void) => void;
  /**
   * Register callback to run when props change
   * @method onPropsChanged
   * @param {function(string, any, any): void} callback - Callback function
   *
   * @example
   * ```typescript
   * onPropsChanged((propName, oldValue, newValue) => {
   *   console.log(`${propName} changed from ${oldValue} to ${newValue}`);
   * });
   * ```
   */
  onPropsChanged: (
    callback: (propName: string, oldValue: any, newValue: any) => void
  ) => void;
  /**
   * Link a prop and a state key (two-way, no extra render)
   *
   * Updates state when the prop changes, and updates the prop/attribute
   * when the state changes without triggering a render. Attribute
   * reflection is forced even if the prop is not marked reflect: true.
   *
   * @method link
   * @param {string} propName - Prop name to link
   * @param {string} [stateKey] - State key to link (defaults to propName)
   *
   * @example
   * ```typescript
   * link('value'); // state.value <-> props.value
   * link('title', 'text'); // state.text <-> props.title
   * ```
   */
  link: (propName: string, stateKey?: string) => void;
  /**
   * Register effect function that runs after renders (with optional cleanup)
   * @method effect
   * @param {function(any[]): (void|function())} fn - Effect function that can return cleanup
   * @param {any[] | (() => any[])} [deps] - Optional dependency array or deps getter
   * @returns {() => void} Cleanup function to remove the effect
   *
   * @example
   * ```typescript
   * const cleanup = effect((deps) => {
   *   const timer = setInterval(() => {}, 1000);
   *   return () => clearInterval(timer); // Cleanup function
   * }, []);
   * ```
   */
  effect: (fn: EffectFn, deps?: any[] | (() => any[])) => () => void;
  /**
   * Register a computed value that updates before renders.
   *
   * @method computed
   * @param {function(any[]): *} getter - Function that returns the computed value
   * @param {any[] | (() => any[])} [deps] - Optional dependency array or deps getter
   * @returns {() => T} Getter for the current computed value
   *
   * @example
   * ```typescript
   * const fullName = computed((deps) => `${props.first} ${state.last}`, () => [props.first, state.last]);
   * return () => `<div>${fullName()}</div>`;
   * ```
   */
  computed: <T>(getter: ComputedGetter<T>, deps?: ComputedDeps) => () => T;
  /**
   * Set up event delegation for dynamic content
   * @method delegate
   * @param {string} eventType - The event type (e.g., 'click', 'input')
   * @param {string} selector - CSS selector to match target elements
   * @param {function(Event, Element): void} handler - Handler function
   * @returns {() => void} Cleanup function to remove the delegation
   *
   * @example
   * ```typescript
   * const cleanup = delegate('click', '.item', (e, target) => {
   *   console.log('Item clicked:', target);
   * });
   * ```
   */
  delegate: (
    eventType: string,
    selector: string,
    handler: (event: Event, target: Element) => void
  ) => () => void;
}

/**
 * Component context including plugin-provided extensions.
 */
export type ComponentContext<
  Props = Record<string, any>,
  State = Record<string, any>,
  Actions = Record<string, Function>,
  Refs = Record<string, HTMLElement | HTMLElement[]>,
  Ext = {},
> = ComponentContextBase<Props, State, Actions, Refs> & Ext;

type UnionToIntersection<U> = (
  U extends any ? (arg: U) => void : never
) extends (arg: infer I) => void
  ? I
  : never;

type PluginExtensions<Plugins extends readonly ComponentPlugin<any>[]> =
  UnionToIntersection<
    Plugins[number] extends ComponentPlugin<infer Ext> ? Ext : {}
  >;

/**
 * Setup function that receives component context and returns a render function
 *
 * @template Props - Type of component props
 * @template State - Type of component state
 * @template Actions - Type of action methods
 * @template Refs - Type of DOM refs
 * @typedef {function} SetupFunction
 * @param {ComponentContext<Props, State, Actions, Refs, Ext>} context - Component context
 * @returns {() => string} Render function that returns HTML template string
 *
 * @example
 * ```typescript
 * const setup: SetupFunction = ({ props, state, actions }) => {
 *   state.count = 0;
 *   actions.increment = () => state.count++;
 *   return () => `<div>Count: ${state.count}</div>`;
 * };
 * ```
 *
 * @see {@link ComponentContext}
 */
export type SetupFunction<
  Props = Record<string, any>,
  State = Record<string, any>,
  Actions = Record<string, Function>,
  Refs = Record<string, HTMLElement | HTMLElement[]>,
  Ext = {},
> = (
  context: ComponentContext<Props, State, Actions, Refs, Ext>
) => () => string;

/**
 * Information about a delegated event handler
 */
export type DelegatedEventInfo = {
  /** The event type (e.g., 'click', 'input') */
  eventType: string;
  /** CSS selector to match elements */
  selector: string;
  /** The actual event listener attached to the root */
  listener: (e: Event) => void;
  /** Set of handler functions registered for this delegation */
  handlers: Set<(e: Event, target: Element) => void>;
};

export type EffectDeps = any[] | (() => any[]);

export type ComputedDeps = any[] | (() => any[]);

export type EffectFn = (deps?: any[]) => void | (() => void);

export type ComputedGetter<T = any> = (deps?: any[]) => T;

export type EffectRecord = {
  fn: EffectFn;
  deps?: EffectDeps;
  prevDeps?: any[];
  cleanup?: () => void;
};

export type ComputedRecord<T = any> = {
  getter: ComputedGetter<T>;
  deps?: ComputedDeps;
  prevDeps?: any[];
  value: T;
};

/**
 * Parses a raw attribute value into the appropriate type based on prop definition.
 *
 * @param raw - The raw attribute value from HTML (string or null)
 * @param def - The prop definition with type and default value
 * @returns The parsed value of the appropriate type, or default if parsing fails
 *
 * @example
 * parsePropValue("42", { type: Number, default: 0 }) // Returns 42 (number)
 * parsePropValue("", { type: Boolean, default: false }) // Returns true
 * parsePropValue('{"a":1}', { type: Object, default: {} }) // Returns {a: 1}
 *
 * @internal
 */
function parsePropValue(raw: string | null, def?: PropDefinition): any {
  // If no definition or simple default value, return raw or default
  if (!def || typeof def !== 'object' || def.type == null) {
    return raw != null ? raw : def;
  }

  const { type, default: d } = def;

  // If attribute is missing, return default
  if (raw == null) return d;

  try {
    switch (type) {
      case String:
        return String(raw);

      case Number: {
        const n = Number(raw);
        // Return default if parsing results in NaN
        return Number.isNaN(n) ? d : n;
      }

      case Boolean: {
        // Empty attribute or "true" string = true
        if (raw === '' || raw === 'true') return true;
        // "false" or "0" string = false
        if (raw === 'false' || raw === '0') return false;
        // Any other non-null value = true
        return raw != null;
      }

      case Object: {
        try {
          // Parse JSON string, or return raw if already an object
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          // Return default if JSON parsing fails
          return d;
        }
      }

      case Array: {
        try {
          // Parse JSON string, or return raw if already an array
          return typeof raw === 'string' ? JSON.parse(raw) : raw;
        } catch {
          // Return default array or empty array if default is not an array
          return Array.isArray(d) ? d : [];
        }
      }

      default:
        return raw;
    }
  } catch {
    // Fallback to default on any error
    return d;
  }
}

/**
 * Reflects a prop value back to an HTML attribute when reflect: true is set.
 *
 * @param el - The element to set the attribute on
 * @param key - The attribute name
 * @param value - The prop value to reflect
 * @param def - The prop definition (to check reflect flag and type)
 *
 * @example
 * reflectAttribute(element, 'count', 42, { type: Number, reflect: true })
 * // Sets element.setAttribute('count', '42')
 *
 * @internal
 */
function reflectAttribute(
  el: HTMLElement,
  key: string,
  value: any,
  def?: PropDefinition
): void {
  // Only reflect if definition exists and reflect is true
  if (!def || typeof def !== 'object' || !def.reflect) return;

  let attrValue: string | null = null;
  const type = def.type;

  // Boolean attributes: set empty string for true, remove for false
  if (type === Boolean) {
    if (value) {
      el.setAttribute(key, '');
      return;
    } else {
      el.removeAttribute(key);
      return;
    }
  }

  // Object and Array: JSON stringify
  if (type === Object || type === Array) {
    try {
      attrValue = value == null ? null : JSON.stringify(value);
    } catch {
      attrValue = null;
    }
  } else if (type === Number) {
    // Number: convert to string
    attrValue = value == null ? null : String(value);
  } else {
    // String or other: convert to string
    attrValue = value == null ? null : String(value);
  }

  // Remove attribute if null, otherwise set it
  if (attrValue == null) el.removeAttribute(key);
  else el.setAttribute(key, attrValue);
}

/**
 * Performs `{key}` interpolation against state/props.
 *
 * @param template - Raw template string from render
 * @param state - Component state
 * @param props - Component props
 * @returns Interpolated template string
 *
 * @internal
 */
const interpolateTemplate = (
  template: string,
  state: Record<string, any>,
  props: Record<string, any>
): string => {
  const scope = { ...props, ...state };
  return template.replace(interpolationPattern, (_match, key) => {
    const value = (scope as any)[key];
    return value == null ? '' : String(value);
  });
};

/**
 * Defines a new custom element component
 *
 * @function define
 * @template Props - Type of component props
 * @template State - Type of component state
 * @template Actions - Type of action methods
 * @template Refs - Type of DOM refs
 *
 * @param {string} tagName - The custom element tag name (must contain a hyphen, e.g., 'my-component')
 * @param {ComponentOptions} [options={}] - Component configuration options
 * @param {SetupFunction<Props, State, Actions, Refs, PluginExtensions<Plugins>>} [setup] - Optional setup function that receives context and returns render function
 * @returns {Function} The custom element class constructor
 *
 * @throws {Error} If tagName doesn't contain a hyphen (required by Custom Elements spec)
 * @throws {Error} If component is already defined (logs warning instead of throwing)
 *
 * @example Basic component
 * ```javascript
 * define('my-counter', {
 *   props: { initialValue: { type: Number, default: 0 } }
 * }, ({ props, state, actions, host }) => {
 *   state.count = props.initialValue;
 *   actions.increment = () => host.setState({ count: state.count + 1 });
 *   return () => `<div>Count: ${state.count}</div>`;
 * });
 * ```
 *
 * @example Component with shadow DOM
 * ```javascript
 * define('styled-button', {
 *   shadow: true,
 *   styles: 'button { background: blue; color: white; }'
 * }, () => {
 *   return () => '<button>Click me</button>';
 * });
 * ```
 *
 * @example Component with TypeScript types
 * ```typescript
 * interface MyProps { count: number }
 * interface MyState { value: string }
 * interface MyActions { handleClick: () => void }
 *
 * define<MyProps, MyState, MyActions>('typed-component', {
 *   props: { count: { type: Number, default: 0 } }
 * }, ({ props, state, actions }) => {
 *   state.value = `Count: ${props.count}`;
 *   actions.handleClick = () => console.log('clicked');
 *   return () => `<div>${state.value}</div>`;
 * });
 * ```
 *
 * @see {@link ComponentContext} for available context properties
 * @see {@link ComponentOptions} for configuration options
 * @see {@link SetupFunction} for setup function signature
 */
function define<
  Props = Record<string, any>,
  State = Record<string, any>,
  Actions = Record<string, Function>,
  Refs = Record<string, HTMLElement | HTMLElement[]>,
  Plugins extends readonly ComponentPlugin<any>[] = [],
>(
  tagName: string,
  options: ComponentOptions<Plugins> = {},
  setup?: SetupFunction<Props, State, Actions, Refs, PluginExtensions<Plugins>>
): typeof HTMLElement {
  const { props: propsDef = {}, shadow = false, styles, plugins } = options;
  const resolvedPlugins = (plugins ?? []) as unknown as Plugins;

  /** Dev mode: only active when NODE_ENV !== 'production' (replaced at build time) */
  const dev = process.env.NODE_ENV !== 'production' ? true : false;

  /**
   * Internal warning function (only logs in dev mode, stripped in production build)
   */
  const warn =
    process.env.NODE_ENV === 'production'
      ? () => {}
      : (code: string, msg: string) => {
          if (!dev) return;
          console.warn(`[${tagName}] ${code}: ${msg}`);
        };

  /**
   * TinyComponent - The custom element class that extends HTMLElement
   *
   * This class implements the component lifecycle, state management, rendering,
   * and all the Scope features.
   */
  class TinyComponent extends HTMLElement {
    /** Library version */
    version: string;

    /** Typed prop definitions for parsing and validation */
    _typedProps: Record<string, PropDefinition>;

    /** Component props (read-only, updated via attributes or setProps) */
    props: Props;

    /** Component state (mutable, updated via setState/updateState) */
    state: State;

    /** Action methods callable from event handlers */
    actions: Actions;

    /** DOM element references (populated after render) */
    refs: Refs;

    /** Render function returned from setup (null until setup runs) */
    _render: (() => string) | null;

    /** Last rendered template string (used to skip DOM work when unchanged) */
    _lastTemplate: string | null;

    /** Flag to prevent duplicate scheduled updates */
    _scheduled: boolean;

    /** Flag to prevent duplicate scheduled effects-only updates */
    _effectsScheduled: boolean;

    /** Root element (ShadowRoot if shadow: true, otherwise this element) */
    _root: HTMLElement | ShadowRoot;

    /** Stored slot content (for light DOM slot projection) */
    _slotStore: Map<string, Node[]> | null;

    /** Array of effect records to run after renders */
    _effects: Array<EffectRecord>;

    /** Array of computed records to run before renders */
    _computed: Array<ComputedRecord>;

    /** Array of onMount callbacks */
    _onMount: Array<() => void>;

    /** Array of onDestroy callbacks */
    _onDestroy: Array<() => void>;

    /** Array of onUpdate callbacks */
    _onUpdate: Array<() => void>;

    /** Array of onBeforeUpdate callbacks */
    _onBeforeUpdate: Array<() => void>;

    /** Array of onFirstUpdate callbacks */
    _onFirstUpdate: Array<() => void>;

    /** Array of onPropsChanged callbacks */
    _onPropsChanged: Array<
      (propName: string, oldValue: any, newValue: any) => void
    >;

    /** Map of delegated event handlers */
    _delegated: Map<string, DelegatedEventInfo>;

    /** Whether component has been mounted */
    _mounted: boolean;

    /** Whether onFirstUpdate has been called */
    _hasFirstUpdated: boolean;

    /** Previous prop values for change tracking */
    _previousProps: Record<string, any>;

    /** Development mode tracking and metrics (only in dev build) */
    _dev?: {
      lastRenderMs: number;
      fullRenders: number;
      scheduledFrames: number;
      missingActions: Set<string>;
      warned: Set<string>;
    };

    /** Whether dev mode is enabled (always false in production build) */
    _devMode: boolean;

    /** Component tag name (for error messages) */
    _tagName: string;

    /** Flag indicating a render is needed (for deferred renders) */
    _needsRender: boolean;

    /** Props to skip render for (internal attribute reflection) */
    _suppressPropRender: Set<string>;

    /** Flag indicating we're currently in the mount render phase */
    _inMountRender: boolean;

    /** Cached flag for shadow root check (performance optimization) */
    _isShadowRoot: boolean;
    /** Binding token registry for function bindings */
    _bindFnTokens: Map<string, Function>;
    /** Monotonic id for binding tokens */
    _bindFnId: number;
    /** Whether a computed accessor is bound in template */
    _hasBoundComputed: boolean;

    /**
     * Constructor - Initializes component instance
     *
     * Sets up all internal state, prop definitions, and binds methods.
     * Does NOT render the component (that happens in connectedCallback).
     */
    constructor() {
      super();
      this.version = SCOPE_VERSION;

      // Process prop definitions: convert simple defaults to full definitions
      this._typedProps = {};
      for (const k of Object.keys(propsDef)) {
        const def = propsDef[k];
        // Check if it's a full definition object
        if (
          def &&
          typeof def === 'object' &&
          ('type' in def || 'default' in def)
        ) {
          this._typedProps[k] = def;
        } else {
          // Simple default value - wrap in definition object
          this._typedProps[k] = {
            type: undefined,
            default: def,
            reflect: false,
          };
        }
      }

      // Initialize component data structures
      this.props = {} as Props;
      this.state = {} as State;
      this.actions = {} as Actions;
      this.refs = {} as Refs;

      // Bind methods to preserve 'this' context
      this.emit = this.emit.bind(this);
      this.listen = this.listen.bind(this);
      this.setState = this.setState.bind(this);
      this.updateState = this.updateState.bind(this);
      this.setProps = this.setProps.bind(this);
      this.scheduleUpdate = this.scheduleUpdate.bind(this);
      this.update = this.update.bind(this);
      this.forceRender = this.forceRender.bind(this);
      this.destroy = this.destroy.bind(this);
      this.$ = this.$.bind(this);

      // Initialize render and scheduling state
      this._render = null;
      this._lastTemplate = null;
      this._scheduled = false;
      this._effectsScheduled = false;

      // Create root (shadow DOM or light DOM)
      this._isShadowRoot = shadow;
      this._root = shadow ? this.attachShadow({ mode: 'open' }) : this;
      this._slotStore = null;

      // Initialize lifecycle hook arrays
      this._effects = [];
      this._computed = [];
      this._onMount = [];
      this._onDestroy = [];
      this._onUpdate = [];
      this._onBeforeUpdate = [];
      this._onFirstUpdate = [];
      this._onPropsChanged = [];
      this._delegated = new Map();

      // Initialize lifecycle flags
      this._mounted = false;
      this._hasFirstUpdated = false;
      this._previousProps = {};

      // Initialize dev mode tracking (stripped in production build)
      if (process.env.NODE_ENV !== 'production') {
        this._dev = {
          lastRenderMs: 0,
          fullRenders: 0,
          scheduledFrames: 0,
          missingActions: new Set(),
          warned: new Set(),
        };
      }
      this._devMode = dev;
      this._tagName = tagName;
      this._needsRender = false;
      this._suppressPropRender = new Set();
      this._inMountRender = false;
      this._bindFnTokens = new Map();
      this._bindFnId = 0;
      this._hasBoundComputed = false;
    }

    /**
     * Checks if an element is inside a nested custom element (not this component).
     *
     * Used to avoid binding events/refs inside child components when rendering
     * in light DOM.
     *
     * @method _isWithinNestedComponent
     * @param {Element} el - Element to test
     * @returns {boolean} True if element is inside a nested component
     *
     * @internal This method is used to avoid cross-component binding
     */
    _isWithinNestedComponent(el: Element): boolean {
      const rootEl = this._isShadowRoot
        ? (this._root as ShadowRoot).host
        : this;
      let node = el.parentElement;
      while (node) {
        if (node === rootEl) return false;
        if (node.tagName.includes('-')) return true;
        node = node.parentElement;
      }
      return false;
    }

    /**
     * Returns the list of attributes to observe for changes
     *
     * @method observedAttributes
     * @static
     * @returns {string[]} Array of attribute names (all props are observed)
     *
     * @internal This is a Custom Elements API requirement
     */
    static get observedAttributes(): string[] {
      return Object.keys(propsDef);
    }

    /**
     * Called by the browser when an observed attribute changes
     *
     * Parses the new attribute value, updates props, triggers onPropsChanged hooks,
     * and schedules a re-render if the component is connected.
     *
     * @method attributeChangedCallback
     * @param {string} name - The attribute name that changed
     * @param {string|null} oldValue - The previous attribute value
     * @param {string|null} newValue - The new attribute value
     * @returns {void}
     *
     * @internal This is a Custom Elements API lifecycle method
     */
    attributeChangedCallback(
      name: string,
      oldValue: string | null,
      newValue: string | null
    ): void {
      // Skip if value hasn't actually changed
      if (oldValue === newValue) return;

      const def = this._typedProps[name];
      const parsedOldValue = this._previousProps[name];
      const parsedNewValue = parsePropValue(newValue, def);

      // Update props
      (this.props as any)[name] = parsedNewValue;

      // Track prop change for onPropsChanged hook (only after mount)
      if (this._mounted && parsedOldValue !== parsedNewValue) {
        for (const cb of this._onPropsChanged) {
          try {
            cb(name, parsedOldValue, parsedNewValue);
          } catch (e: any) {
            warn('ON_PROPS_CHANGED_ERROR', String(e?.message || e));
          }
        }
      }

      // Update previous props tracking
      this._previousProps[name] = parsedNewValue;

      // Skip render for internal reflection updates
      if (this._suppressPropRender.has(name)) {
        this._suppressPropRender.delete(name);
        return;
      }

      // If component not ready, defer render
      if (!this._render || !this.isConnected) {
        this._needsRender = true;
        return;
      }

      // If currently mounting, defer render
      if (this._inMountRender) {
        this._needsRender = true;
        return;
      }

      // Trigger update
      this.update(true);
    }

    /**
     * Called when component is connected to the DOM
     *
     * This is the main mount entry point. It:
     * 1. Parses props from attributes
     * 2. Captures slot content (for light DOM)
     * 3. Executes setup function to get render function
     * 4. Performs initial render
     * 5. Runs lifecycle hooks
     *
     * Optimized for fastest initial render - critical path operations happen
     * synchronously, non-critical work is deferred.
     *
     * @method connectedCallback
     * @returns {void}
     *
     * @internal This is a Custom Elements API lifecycle method
     */
    connectedCallback(): void {
      // PRIORITY 1: Parse props (required for render)
      // Read all HTML attributes and parse according to prop definitions
      // Use for...in loop (faster than forEach)
      for (const key in this._typedProps) {
        if (!this._typedProps.hasOwnProperty(key)) continue;
        const attr = this.getAttribute(key);
        const def = this._typedProps[key];
        const parsedValue = parsePropValue(attr, def);
        (this.props as any)[key] = parsedValue;
        // Track initial prop values for change detection
        this._previousProps[key] = parsedValue;
      }

      // PRIORITY 2: Capture slots (must happen before innerHTML is set)
      // For light DOM, we need to capture child nodes before they're replaced
      if (!shadow && !this._slotStore) {
        this._slotStore = this._captureSlotsFromLightChildren();
      }

      // PRIORITY 3: Execute setup to get render function (critical path)
      // Call user's setup function with component context
      let setupResult: (() => string) | null = null;
      try {
        if (setup) {
          const context: ComponentContextBase<Props, State, Actions, Refs> = {
            props: this.props,
            state: this.state,
            actions: this.actions,
            refs: this.refs,
            emit: this.emit,
            listen: this.listen,
            updateState: this.updateState.bind(this),
            $: this.$,
            host: this as any,
            // Lifecycle hook registration functions
            onMount: (cb) => this._onMount.push(cb),
            onDestroy: (cb) => this._onDestroy.push(cb),
            onUpdate: (cb) => this._onUpdate.push(cb),
            onBeforeUpdate: (cb) => this._onBeforeUpdate.push(cb),
            onFirstUpdate: (cb) => this._onFirstUpdate.push(cb),
            onPropsChanged: (cb) => this._onPropsChanged.push(cb),
            link: (propName, stateKey) => {
              const key = stateKey || propName;
              (this.state as any)[key] = (this.props as any)[propName];
              this._onPropsChanged.push((name, _old, value) => {
                if (name !== propName) return;
                if (Object.is((this.state as any)[key], value)) return;
                (this.state as any)[key] = value;
              });
              const record: EffectRecord = {
                fn: () => {
                  const next = (this.state as any)[key];
                  if (Object.is((this.props as any)[propName], next)) return;
                  (this.props as any)[propName] = next;
                  this._previousProps[propName] = next;
                  const def = this._typedProps[propName];
                  const reflectDef = def ? { ...def, reflect: true } : def;
                  const oldAttr = this.getAttribute(propName);
                  this._suppressPropRender.add(propName);
                  reflectAttribute(this, propName, next, reflectDef);
                  const newAttr = this.getAttribute(propName);
                  if (oldAttr === newAttr) {
                    this._suppressPropRender.delete(propName);
                  }
                },
                deps: () => [(this.state as any)[key]],
              };
              this._effects.push(record);
            },
            computed: (getter, deps) => {
              let initialDeps: any[] | undefined;
              if (deps !== undefined) {
                try {
                  const depsValue = typeof deps === 'function' ? deps() : deps;
                  if (Array.isArray(depsValue)) {
                    initialDeps = depsValue;
                  }
                } catch (e: any) {
                  warn('COMPUTED_DEPS_ERROR', String(e?.message || e));
                }
              }

              const record: ComputedRecord = {
                getter,
                deps,
                value: deps !== undefined ? getter(initialDeps) : getter(),
              };
              this._computed.push(record);
              const accessor = () => record.value;
              (accessor as any).__scopeComputed = record;
              this._registerBindFn(accessor);
              return accessor;
            },
            // Effect registration with cleanup return
            effect: (fn, deps) => {
              const record: EffectRecord = { fn, deps };
              this._effects.push(record);
              return () => this._removeEffect(record);
            },
            // Event delegation with cleanup return
            delegate: (eventType, selector, handler) => {
              this._delegate(eventType, selector, handler);
              return () => this._undelegate(eventType, selector, handler);
            },
          };

          for (const plugin of resolvedPlugins) {
            if (!plugin) continue;
            try {
              const extension = plugin.extend(context, this as any);
              if (extension && typeof extension === 'object') {
                Object.assign(context, extension);
              }
            } catch (e: any) {
              warn('PLUGIN_ERROR', String(e?.message || e));
            }
          }

          setupResult = setup(
            context as ComponentContext<
              Props,
              State,
              Actions,
              Refs,
              PluginExtensions<Plugins>
            >
          );
        }
      } catch (e: any) {
        warn('SETUP_ERROR', String(e?.message || e));
      }

      // Validate setup result
      if (typeof setupResult !== 'function') {
        warn(
          'BAD_RENDER',
          'setup() must return a function that returns a string template.'
        );
        this._render = () => '';
      } else {
        this._render = setupResult;
      }

      // PRIORITY 4: INITIAL RENDER (TOP PRIORITY - happens immediately)
      // Set flag to indicate we're in mount render phase
      this._inMountRender = true;
      this.update(true);
      this._inMountRender = false;

      // PRIORITY 5: Handle deferred render if needed
      // If attributes changed during mount, render again
      if (this._needsRender) {
        this._needsRender = false;
        this.update(true);
      }

      // PRIORITY 6: Execute lifecycle callbacks (after render is complete)
      if (!this._mounted) {
        this._mounted = true;
        // Call onMount callbacks
        // Note: onFirstUpdate is called via _callUpdateHooks() after render completes
        for (const cb of this._onMount) {
          try {
            cb();
          } catch (e: any) {
            warn('ON_MOUNT_ERROR', String(e?.message || e));
          }
        }
      }
    }

    /**
     * Called when component is disconnected from the DOM
     *
     * Triggers cleanup by calling destroy()
     *
     * @method disconnectedCallback
     * @returns {void}
     *
     * @internal This is a Custom Elements API lifecycle method
     */
    disconnectedCallback(): void {
      this.destroy();
    }

    /**
     * Removes the component from the DOM
     *
     * This triggers disconnectedCallback, which runs destroy() cleanup.
     *
     * @method remove
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Manually remove a component
     * const element = document.querySelector('my-component');
     * element.remove();
     * ```
     */
    remove(): void {
      super.remove();
    }

    /**
     * Select DOM elements within the component.
     * Returns a single element, or an array of elements if multiple match.
     *
     * @method $
     * @param {string} selector - CSS selector to match elements
     * @returns {Element | Element[] | null} Single element, array of elements, or null if none match
     *
     * @example
     * ```typescript
     * const btn = host.$('button.primary');   // single element or null
     * const items = host.$('.list-item');     // array when multiple match
     * ```
     */
    $(selector: string): Element | Element[] | null {
      const root = this._root as ParentNode;
      const nodes = root.querySelectorAll(selector);
      if (nodes.length === 0) return null;
      if (nodes.length === 1) return nodes[0];
      return Array.from(nodes);
    }

    /**
     * Destroys the component and cleans up all resources
     *
     * Runs onDestroy callbacks, cleans up effects, removes event listeners,
     * and resets mounted flag.
     *
     * @method destroy
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Manually destroy a component
     * const element = document.querySelector('my-component');
     * element.destroy();
     * ```
     *
     * @see {@link ComponentContext.onDestroy} for registering destroy callbacks
     */
    destroy(): void {
      // Run onDestroy callbacks
      for (const cb of this._onDestroy) {
        try {
          cb();
        } catch (e: any) {
          warn('ON_DESTROY_ERROR', String(e?.message || e));
        }
      }

      // Clean up all effect cleanup functions
      for (const effect of this._effects) {
        if (!effect.cleanup) continue;
        try {
          effect.cleanup();
        } catch (e: any) {
          warn('EFFECT_CLEANUP_ERROR', String(e?.message || e));
        }
        effect.cleanup = undefined;
      }

      // Remove all delegated event listeners
      for (const [, info] of this._delegated) {
        try {
          this._root.removeEventListener(info.eventType, info.listener);
        } catch {}
      }
      this._delegated.clear();

      // Reset mounted flag
      this._mounted = false;
    }

    /**
     * Emits a custom event that bubbles up the DOM tree
     *
     * @method emit
     * @param {string} name - Event name (e.g., 'item-clicked', 'value-changed')
     * @param {any} [detail] - Optional event detail data
     * @returns {void}
     *
     * @example
     * ```typescript
     * emit('item-clicked', { id: 123, name: 'Item' });
     * ```
     *
     * @example Listening to events
     * ```javascript
     * const element = document.querySelector('my-component');
     * element.addEventListener('item-clicked', (e) => {
     *   console.log('Item:', e.detail.id);
     * });
     * ```
     *
     * @example Listening in templates
     * ```typescript
     * return () => `<button on:custom-click="handleCustom">Click</button>`;
     * ```
     */
    emit(name: string, detail?: any): void {
      this.dispatchEvent(
        new CustomEvent(name, { detail, bubbles: true, composed: true })
      );
    }

    /**
     * Listen to a custom event from a given target
     *
     * Registers a listener and automatically removes it on destroy.
     *
     * @method listen
     * @param {EventTarget} target - Target to attach the listener to
     * @param {string} name - Custom event name to listen for
     * @param {function(CustomEvent): void} handler - Event handler
     * @param {AddEventListenerOptions} [options] - Listener options
     * @returns {() => void} Cleanup function to remove the listener
     */
    listen(
      target: EventTarget,
      name: string,
      handler: (event: CustomEvent<any>) => void,
      options?: AddEventListenerOptions
    ): () => void {
      const listener = handler as EventListener;
      target.addEventListener(name, listener, options);
      const cleanup = () => {
        try {
          target.removeEventListener(name, listener, options);
        } catch {}
      };
      this._onDestroy.push(cleanup);
      return cleanup;
    }

    /**
     * Updates state and triggers a full re-render
     *
     * This is the primary way to update component state. It merges the partial
     * state update, then schedules a full render (including template re-execution).
     *
     * @method setState
     * @param {Partial<State>} partial - Partial state object to merge into current state
     * @returns {void}
     *
     * @example
     * ```typescript
     * host.setState({ count: 5, name: 'Updated' });
     * ```
     *
     * @example In action handler
     * ```typescript
     * actions.increment = () => {
     *   host.setState({ count: state.count + 1 });
     * };
     * ```
     *
     * @see {@link updateState} for updating state without re-render
     */
    setState(partial: Partial<State>): void {
      // Merge new state into existing state (skip if nothing actually changed)
      let didChange = false;
      const next = partial as any;
      const current = this.state as any;
      for (const key in next) {
        if (!Object.prototype.hasOwnProperty.call(next, key)) continue;
        const value = next[key];
        if (!Object.is(current[key], value)) {
          current[key] = value;
          didChange = true;
        }
      }
      if (!didChange) return;

      // Always rerender when setState is called
      if (this._inMountRender || !this._mounted) {
        // During mount or before mount, render immediately
        this.update(true);
      } else {
        // After mount, schedule render via requestAnimationFrame
        if (!this._render || !this.isConnected) return;
        if (this._scheduled) return; // Prevent duplicate scheduling

        this._scheduled = true;
        requestAnimationFrame(() => {
          this._scheduled = false;
          if (!this._render || !this.isConnected) return;
          this.update(true); // Full render, not just effects
        });
      }
    }

    /**
     * Updates state without triggering a re-render
     *
     * Useful when you want to update state but don't need to re-render the template.
     * Effects will still run, allowing you to react to state changes without
     * the overhead of a full render.
     *
     * @method updateState
     * @param {Partial<State>} partial - Partial state object to merge into current state
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Update scroll position without re-rendering
     * host.updateState({ scrollPosition: 100 });
     * ```
     *
     * @example Tracking non-visual state
     * ```typescript
     * window.addEventListener('scroll', () => {
     *   host.updateState({ scrollY: window.scrollY });
     * });
     * ```
     *
     * @see {@link setState} for updating state with re-render
     */
    updateState(partial: Partial<State>): void {
      // Update state without rerendering, but trigger effects
      Object.assign(this.state as any, partial);

      // Run effects to react to state changes
      if (!this._render || !this.isConnected) return;
      this._scheduleEffects();
    }

    /**
     * Updates props programmatically
     *
     * This is the recommended way to pass large objects or arrays to components,
     * as it avoids HTML attribute size limits and doesn't require JSON stringification.
     *
     * @method setProps
     * @param {Partial<Props>} partial - Partial props object to merge into current props
     * @returns {void}
     *
     * @example Passing large data
     * ```typescript
     * const element = document.querySelector('my-component');
     * element.setProps({
     *   data: largeArray,
     *   config: complexObject
     * });
     * ```
     *
     * @example Updating props from parent component
     * ```typescript
     * // In parent component
     * const child = this.refs.childComponent;
     * child.setProps({ count: 10 });
     * ```
     *
     * @see README.md for more information on passing large objects/arrays
     */
    setProps(partial: Partial<Props>): void {
      const keys = Object.keys(partial);
      if (keys.length === 0) return; // Early exit if no props to update

      const changedKeys: string[] = [];

      // Single pass: merge props, track changes, and handle reflection
      for (const k of keys) {
        const newValue = (partial as any)[k];
        const oldValue = this._previousProps[k];

        // Merge immediately
        (this.props as any)[k] = newValue;

        // Track changes for callbacks
        if (this._mounted && oldValue !== newValue) {
          changedKeys.push(k);
        }

        // Handle reflection
        const def = this._typedProps[k];
        if (def && def.reflect) {
          reflectAttribute(this, k, newValue, def);
        }

        // Update previous props tracking
        if (!this._mounted || oldValue !== newValue) {
          this._previousProps[k] = newValue;
        }
      }

      // Call callbacks only for changed props (after mount)
      if (this._mounted && changedKeys.length > 0) {
        for (const k of changedKeys) {
          const oldValue = this._previousProps[k];
          const newValue = (partial as any)[k];
          for (const cb of this._onPropsChanged) {
            try {
              cb(k, oldValue, newValue);
            } catch (e: any) {
              warn('ON_PROPS_CHANGED_ERROR', String(e?.message || e));
            }
          }
        }
      }

      // Schedule render if component is ready
      if (!this._render || !this.isConnected) {
        this._needsRender = true;
        return;
      }
      this.update(true);
    }

    /**
     * Schedules a partial update (effects only, no template re-render)
     *
     * Useful for triggering effects without the overhead of a full render.
     * Uses requestAnimationFrame to batch updates.
     *
     * @method scheduleUpdate
     * @returns {void}
     *
     * @example
     * ```typescript
     * // Schedule effects to run on next animation frame
     * host.scheduleUpdate();
     * ```
     *
     * @example Triggering effects after external change
     * ```typescript
     * externalLibrary.onChange(() => {
     *   // Update state without render, then schedule effects
     *   host.updateState({ externalData: newData });
     *   host.scheduleUpdate();
     * });
     * ```
     */
    scheduleUpdate(): void {
      if (!this._render || !this.isConnected) return;
      this._scheduleEffects();
    }

    /**
     * Schedule an effects-only update in a microtask.
     *
     * Keeps effects responsive without blocking full renders scheduled via RAF.
     *
     * @method _scheduleEffects
     * @returns {void}
     *
     * @internal This method is called by updateState/scheduleUpdate
     */
    _scheduleEffects(): void {
      if (this._effectsScheduled) return;
      if (this._scheduled) return; // A full render is already queued
      this._effectsScheduled = true;

      const queue =
        typeof queueMicrotask === 'function'
          ? queueMicrotask
          : (cb: () => void) => Promise.resolve().then(cb);

      queue(() => {
        this._effectsScheduled = false;
        if (!this._render || !this.isConnected) return;
        if (this._scheduled) return;
        this.update(false);
      });
    }

    /**
     * Main update method - handles both full and partial renders
     *
     * Full render (fullRender = true):
     * - Calls onBeforeUpdate hooks
     * - Executes render function
     * - Updates DOM (innerHTML)
     * - Projects slots
     * - Syncs refs
     * - Binds event handlers
     * - Runs effects
     * - Calls update hooks (onFirstUpdate, onUpdate)
     *
     * Partial update (fullRender = false):
     * - Runs effects only
     * - Calls update hooks
     *
     * @method update
     * @param {boolean} fullRender - Whether to perform a full render or just run effects
     * @returns {void}
     *
     * @example
     * ```typescript
     * host.update(true);  // Full render
     * host.update(false); // Effects only
     * ```
     *
     * @internal This method is typically called internally, but can be called manually if needed
     */
    update(fullRender: boolean): void {
      if (!this._render) return;

      // Call onBeforeUpdate hooks before update (only for full renders after mount)
      if (fullRender && this._mounted) {
        for (const cb of this._onBeforeUpdate) {
          try {
            cb();
          } catch (e: any) {
            warn('ON_BEFORE_UPDATE_ERROR', String(e?.message || e));
          }
        }
      }

      if (fullRender) {
        this._runComputed();
        // CRITICAL PATH: Render template immediately
        let template = '';
        try {
          template = this._render();
        } catch (e: any) {
          warn('RENDER_ERROR', String(e?.message || e));
          // On render error, use empty template
          template = '';
        }

        // Ensure template is a string
        if (typeof template !== 'string')
          template = template == null ? '' : String(template);

        template = interpolateTemplate(
          template,
          this.state as any,
          this.props as any
        );
        if (!this._isShadowRoot) {
          const slotOwnerAttr = `data-scope-owner="${this._tagName}"`;
          template = template.replace(
            /<slot(?![^>]*data-scope-owner)(\s|>)/g,
            `<slot ${slotOwnerAttr}$1`
          );
        }
        this._hasBoundComputed = false;

        const templateUnchanged =
          this._lastTemplate !== null &&
          Object.is(this._lastTemplate, template);
        let didUpdateDom = false;

        if (!templateUnchanged || !this._mounted) {
          // IMMEDIATE: Set innerHTML first (component becomes visible instantly)
          // Use cached flag instead of instanceof check
          if (this._isShadowRoot) {
            (this._root as ShadowRoot).innerHTML = template;
          } else {
            (this._root as HTMLElement).innerHTML = template;
          }
          this._lastTemplate = template;
          didUpdateDom = true;
        }

        // OPTIMIZED: Split critical vs non-critical post-render work
        if (this._inMountRender) {
          // During mount: defer non-critical work for fastest first paint
          // Sync refs immediately (needed for effects that might run)
          this._syncRefs();

          // Defer slots, events, and effects to the next frame
          // This allows the browser to paint before processing interactivity
          const schedulePostRender =
            typeof requestAnimationFrame === 'function'
              ? requestAnimationFrame
              : (cb: () => void) => setTimeout(cb, 0);
          schedulePostRender(() => {
            if (!this._render || !this.isConnected) return;
            if (didUpdateDom && !shadow) this.projectSlots();
            if (didUpdateDom) this._bindEventHandlers();
            this._runEffects();
            this._callUpdateHooks();
          });
        } else {
          // Subsequent renders: process immediately (already visible)
          if (didUpdateDom && !shadow) this.projectSlots();
          if (didUpdateDom) this._syncRefsAndBindEvents();
          this._runEffects();
          this._callUpdateHooks();
        }
      } else {
        // Partial update: run effects only (no template re-execution)
        if (this._hasBoundComputed) {
          this._runComputed();
        }
        this._runEffects();
        if (this._mounted) {
          this._callUpdateHooks();
        }
      }
    }

    /**
     * Forces a full re-render by clearing template cache
     *
     * Useful when you need to re-render even if the template output
     * hasn't changed (e.g., to rebind events or re-sync DOM).
     *
     * @method forceRender
     * @returns {void}
     */
    forceRender(): void {
      this._lastTemplate = null;
      if (!this._render || !this.isConnected) {
        this._needsRender = true;
        return;
      }
      if (this._inMountRender) {
        this._needsRender = true;
        return;
      }
      this.update(true);
    }

    /**
     * Calls update-related lifecycle hooks
     *
     * - Calls onFirstUpdate hooks (only once, after first render)
     * - Calls onUpdate hooks (after every update)
     *
     * This is called after effects run, ensuring refs are available.
     *
     * @method _callUpdateHooks
     * @returns {void}
     *
     * @internal This method is called automatically during update cycle
     */
    _callUpdateHooks(): void {
      // Call onFirstUpdate hooks (only once)
      if (!this._hasFirstUpdated) {
        this._hasFirstUpdated = true;
        for (const cb of this._onFirstUpdate) {
          try {
            cb();
          } catch (e: any) {
            warn('ON_FIRST_UPDATE_ERROR', String(e?.message || e));
          }
        }
      }

      // Call onUpdate hooks (every update)
      for (const cb of this._onUpdate) {
        try {
          cb();
        } catch (e: any) {
          warn('ON_UPDATE_ERROR', String(e?.message || e));
        }
      }

      this._applyBindings();
    }

    /**
     * Applies `bind:*` directives to the current DOM.
     *
     * This is a one-way binding pass that updates DOM properties/attributes
     * after updates (including effects-only updates from updateState).
     *
     * @method _applyBindings
     * @returns {void}
     *
     * @internal This method is called after update hooks run
     */
    _applyBindings(): void {
      const root = this._isShadowRoot ? this._root : this;
      const elements = root.querySelectorAll('*');
      const hasOwn = Object.prototype.hasOwnProperty;
      const state = this.state as Record<string, any>;
      const props = this.props as Record<string, any>;
      const actions = this.actions as Record<string, any>;
      const bindLen = bindPrefix.length;

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i] as HTMLElement;
        if (this._isWithinNestedComponent(el)) continue;
        if (el.attributes.length === 0) continue;

        const attrs = el.attributes;
        for (let j = attrs.length - 1; j >= 0; j--) {
          const attr = attrs[j];
          if (!attr.name.startsWith(bindPrefix)) continue;

          const propName = attr.name.slice(bindLen);
          const rawValue = attr.value;
          const trimmedValue = rawValue ? rawValue.trim() : '';
          let currentValue: any = undefined;
          let resolved = false;

          if (trimmedValue) {
            const tokenFn = this._bindFnTokens.get(trimmedValue);
            if (tokenFn) {
              if ((tokenFn as any).__scopeComputed) {
                this._hasBoundComputed = true;
              }
              try {
                currentValue = tokenFn();
              } catch {}
              resolved = true;
            }
          }

          if (!resolved) {
            const stateKey = trimmedValue || propName;
            const hasState = hasOwn.call(state, stateKey);
            const hasProps = !hasState && hasOwn.call(props, stateKey);
            if (hasState) currentValue = state[stateKey];
            else if (hasProps) currentValue = props[stateKey];
          }

          if (propName === 'text') {
            const nextText = currentValue == null ? '' : String(currentValue);
            if (el.textContent !== nextText) {
              el.textContent = nextText;
            }
          } else if (propName === 'html') {
            const nextHtml = currentValue == null ? '' : String(currentValue);
            if (el.innerHTML !== nextHtml) {
              el.innerHTML = nextHtml;
            }
          } else if (propName in el) {
            if (!Object.is((el as any)[propName], currentValue)) {
              try {
                (el as any)[propName] = currentValue;
              } catch {}
            }
            if (propName === 'value') {
              try {
                if (currentValue == null) el.removeAttribute('value');
                else el.setAttribute('value', String(currentValue));
              } catch {}
            }
          } else if (currentValue != null) {
            try {
              el.setAttribute(propName, String(currentValue));
            } catch {}
          }

          const handlerKey = `__scopeBind_${propName}`;
          const oldHandler = (el as any)[handlerKey];
          if (oldHandler) {
            const eventType = oldHandler.__scopeEventType;
            if (eventType) el.removeEventListener(eventType, oldHandler);
            delete (el as any)[handlerKey];
          }
        }
      }
    }

    /**
     * Runs all registered computed getters
     *
     * Updates computed values before rendering based on dependencies.
     *
     * @method _runComputed
     * @returns {void}
     *
     * @internal This method is called automatically during update cycle
     */
    _runComputed(): void {
      for (const record of this._computed) {
        let shouldRun = true;
        let nextDeps: any[] | undefined;

        if (record.deps !== undefined) {
          try {
            const depsValue =
              typeof record.deps === 'function' ? record.deps() : record.deps;

            if (Array.isArray(depsValue)) {
              nextDeps = depsValue;
              if (
                record.prevDeps &&
                record.prevDeps.length === nextDeps.length
              ) {
                shouldRun = false;
                for (let i = 0; i < nextDeps.length; i++) {
                  if (!Object.is(record.prevDeps[i], nextDeps[i])) {
                    shouldRun = true;
                    break;
                  }
                }
              }
            }
          } catch (e: any) {
            warn('COMPUTED_DEPS_ERROR', String(e?.message || e));
            shouldRun = true;
            nextDeps = undefined;
          }
        }

        if (!shouldRun) continue;

        try {
          record.value =
            record.deps !== undefined
              ? record.getter(nextDeps)
              : record.getter();
        } catch (e: any) {
          warn('COMPUTED_ERROR', String(e?.message || e));
        }

        if (nextDeps) {
          record.prevDeps = nextDeps.slice();
        }
      }
    }

    /**
     * Runs all registered effects
     *
     * Runs effects based on optional dependencies and handles cleanups.
     *
     * @method _runEffects
     * @returns {void}
     *
     * @internal This method is called automatically during update cycle
     */
    _runEffects(): void {
      for (const effect of this._effects) {
        let shouldRun = true;
        let nextDeps: any[] | undefined;

        if (effect.deps !== undefined) {
          try {
            const depsValue =
              typeof effect.deps === 'function' ? effect.deps() : effect.deps;

            if (Array.isArray(depsValue)) {
              nextDeps = depsValue;
              if (
                effect.prevDeps &&
                effect.prevDeps.length === nextDeps.length
              ) {
                shouldRun = false;
                for (let i = 0; i < nextDeps.length; i++) {
                  if (!Object.is(effect.prevDeps[i], nextDeps[i])) {
                    shouldRun = true;
                    break;
                  }
                }
              }
            }
          } catch (e: any) {
            warn('EFFECT_DEPS_ERROR', String(e?.message || e));
            shouldRun = true;
            nextDeps = undefined;
          }
        }

        if (!shouldRun) continue;

        if (effect.cleanup) {
          try {
            effect.cleanup();
          } catch {}
          effect.cleanup = undefined;
        }

        try {
          const cleanup =
            effect.deps !== undefined ? effect.fn(nextDeps) : effect.fn();
          if (typeof cleanup === 'function') effect.cleanup = cleanup;
        } catch {}

        if (nextDeps) {
          effect.prevDeps = nextDeps.slice();
        }
      }
    }

    /**
     * Removes an effect function from the effects array
     *
     * @method _removeEffect
     * @param {EffectRecord} effect - The effect record to remove
     * @returns {void}
     *
     * @internal This method is called via the cleanup function returned from effect()
     */
    _removeEffect(effect: EffectRecord): void {
      const i = this._effects.indexOf(effect);
      if (i !== -1) {
        if (effect.cleanup) {
          try {
            effect.cleanup();
          } catch {}
        }
        this._effects.splice(i, 1);
      }
    }

    /**
     * Registers a function for bind:* usage inside templates.
     *
     * Binds computed accessors into the template by replacing their string
     * representation with a stable token that can be resolved later.
     *
     * @method _registerBindFn
     * @param {Function} fn - Function to register for template binding
     * @returns {string} Token string used in the template
     *
     * @internal This method is called automatically for computed bindings
     */
    _registerBindFn(fn: Function): string {
      const existing = (fn as any).__scopeBindToken;
      if (existing && typeof existing === 'string') {
        this._bindFnTokens.set(existing, fn);
        return existing;
      }
      const token = `__scope_bind_${++this._bindFnId}__`;
      this._bindFnTokens.set(token, fn);
      try {
        (fn as any).__scopeBindToken = token;
        (fn as any).toString = () => token;
      } catch {}
      return token;
    }

    /**
     * Syncs DOM refs by finding all elements with [ref] attributes
     *
     * Populates this.refs with references to DOM elements. If multiple
     * elements have the same ref name, they become an array.
     *
     * @method _syncRefs
     * @returns {void}
     *
     * @example Template usage
     * ```typescript
     * return () => '<div ref="myDiv">Content</div>';
     * // Access via: refs.myDiv
     * ```
     *
     * @internal This method is called automatically during render
     */
    _syncRefs(): void {
      const root = this._isShadowRoot ? (this._root as ShadowRoot) : this;
      const refs = root.querySelectorAll('[ref]');

      // Clear existing refs (mutate in place to preserve reference)
      const currentRefs = this.refs as any;
      for (const k in currentRefs) {
        if (currentRefs.hasOwnProperty(k)) {
          delete currentRefs[k];
        }
      }

      // Early exit if no refs
      if (refs.length === 0) {
        return;
      }

      // Find all elements with ref attributes and add to existing refs object
      // (mutate in place to preserve reference passed to setup function)
      for (let i = 0; i < refs.length; i++) {
        const el = refs[i] as HTMLElement;
        if (this._isWithinNestedComponent(el)) continue;
        const name = el.getAttribute('ref');
        if (name) {
          // Optimize array operations: use push instead of spread
          if (!currentRefs[name]) {
            currentRefs[name] = el;
          } else if (Array.isArray(currentRefs[name])) {
            (currentRefs[name] as HTMLElement[]).push(el);
          } else {
            currentRefs[name] = [currentRefs[name] as HTMLElement, el];
          }
        }
      }
    }

    /**
     * Binds event handlers from on:* attributes
     *
     * Finds all elements with on:* attributes (e.g., on:click="handleClick"),
     * removes the attribute, and binds the corresponding action method as
     * an event listener.
     *
     * @method _bindEventHandlers
     * @returns {void}
     *
     * @example Template usage
     * ```typescript
     * actions.handleClick = () => { /* ... *\/ };
     * return () => '<button on:click="handleClick">Click</button>';
     * ```
     *
     * @internal This method is called automatically during render
     */
    _bindEventHandlers(): void {
      // Bind event handlers from on:* attributes
      const root = this._isShadowRoot ? (this._root as ShadowRoot) : this;
      const allElements = root.querySelectorAll('*');

      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i] as HTMLElement;
        if (this._isWithinNestedComponent(el)) continue;
        // Optimize: attributes is always truthy, just check length
        if (el.attributes.length === 0) continue;

        // Iterate backwards to safely remove attributes while iterating
        const attrs = el.attributes;
        for (let j = attrs.length - 1; j >= 0; j--) {
          const attr = attrs[j];
          if (!attr.name.startsWith('on:')) continue;

          const eventType = attr.name.slice(3); // Use slice instead of substring
          const actionName = attr.value;

          // Remove old listener if exists (prevent memory leak)
          const handlerKey = `__tinyHandler_${eventType}`;
          const oldHandler = (el as any)[handlerKey];
          if (oldHandler) {
            el.removeEventListener(eventType, oldHandler);
          }

          // Remove attribute (no longer needed after binding)
          el.removeAttribute(attr.name);

          // Bind event handler if action exists
          const action = (this.actions as any)[actionName];
          if (action && typeof action === 'function') {
            // Create handler once and store reference
            const handler = (e: Event) => {
              action.call(this.actions, e);
            };
            (el as any)[handlerKey] = handler;
            el.addEventListener(eventType, handler);
          } else {
            if (process.env.NODE_ENV !== 'production' && this._devMode) {
              console.warn(
                `[${this._tagName}] MISSING_ACTION: Action "${actionName}" not found for on:${eventType}`
              );
            }
          }
        }
      }
    }

    /**
     * Optimized: Single DOM traversal to sync refs and bind event handlers
     *
     * Combines _syncRefs() and _bindEventHandlers() into one DOM traversal
     * for better performance on subsequent renders.
     *
     * @method _syncRefsAndBindEvents
     * @returns {void}
     *
     * @internal This method is called automatically during subsequent renders for performance
     */
    _syncRefsAndBindEvents(): void {
      // Single DOM traversal to sync refs and bind event handlers
      // Using querySelectorAll is faster for small trees, and we combine both operations
      const root = this._isShadowRoot ? (this._root as ShadowRoot) : this;
      const allElements = root.querySelectorAll('*');

      // Clear existing refs (mutate in place to preserve reference)
      const currentRefs = this.refs as any;
      for (const k in currentRefs) {
        if (currentRefs.hasOwnProperty(k)) {
          delete currentRefs[k];
        }
      }

      for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i] as HTMLElement;
        if (this._isWithinNestedComponent(el)) continue;

        // Sync refs (mutate in place to preserve reference)
        const refName = el.getAttribute('ref');
        if (refName) {
          // Optimize array operations: use push instead of spread
          if (!currentRefs[refName]) {
            currentRefs[refName] = el;
          } else if (Array.isArray(currentRefs[refName])) {
            (currentRefs[refName] as HTMLElement[]).push(el);
          } else {
            currentRefs[refName] = [currentRefs[refName] as HTMLElement, el];
          }
        }

        // Bind event handlers - process attributes directly
        // Optimize: attributes is always truthy, just check length
        if (el.attributes.length > 0) {
          // Iterate backwards to safely remove attributes while iterating
          const attrs = el.attributes;
          for (let j = attrs.length - 1; j >= 0; j--) {
            const attr = attrs[j];
            if (!attr.name.startsWith('on:')) continue;

            const eventType = attr.name.slice(3); // Use slice instead of substring
            const actionName = attr.value;

            // Remove old listener if exists (prevent memory leak)
            const handlerKey = `__tinyHandler_${eventType}`;
            const oldHandler = (el as any)[handlerKey];
            if (oldHandler) {
              el.removeEventListener(eventType, oldHandler);
            }

            // Remove attribute
            el.removeAttribute(attr.name);

            // Bind event handler
            const action = (this.actions as any)[actionName];
            if (action && typeof action === 'function') {
              // Create handler once and store reference
              const handler = (e: Event) => {
                action.call(this.actions, e);
              };
              (el as any)[handlerKey] = handler;
              el.addEventListener(eventType, handler);
            } else {
              if (process.env.NODE_ENV !== 'production' && this._devMode) {
                console.warn(
                  `[${this._tagName}] MISSING_ACTION: Action "${actionName}" not found for on:${eventType}`
                );
              }
            }
          }
        }
      }
    }

    /**
     * Captures slot content from light DOM children before render
     *
     * For light DOM components, we need to capture child nodes before
     * innerHTML replaces them. Groups nodes by their slot attribute.
     *
     * @method _captureSlotsFromLightChildren
     * @returns {Map<string, Node[]>} Map of slot names to arrays of nodes
     *
     * @internal This method is called automatically during mount for light DOM components
     */
    _captureSlotsFromLightChildren(): Map<string, Node[]> {
      const map = new Map<string, Node[]>();
      const childNodes = this.childNodes;
      const nodes: Node[] = [];

      // Convert NodeList to array (use for loop for better performance)
      for (let i = 0; i < childNodes.length; i++) {
        nodes.push(childNodes[i]);
      }

      // Group nodes by slot name (default slot = empty string)
      // Use for loop instead of forEach
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let name = '';
        if (node.nodeType === 1 && (node as Element).getAttribute) {
          const slotAttr = (node as Element).getAttribute('slot');
          name = slotAttr || '';
        }
        if (!map.has(name)) map.set(name, []);
        map.get(name)!.push(node);
      }

      // Remove nodes from DOM (they'll be projected later)
      // Use for loop instead of forEach
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.parentNode) {
          node.parentNode.removeChild(node);
        }
      }
      return map;
    }

    /**
     * Projects slot content into <slot> elements
     *
     * Replaces <slot> elements with their assigned content from _slotStore.
     * If no content is assigned, uses the slot's default content.
     *
     * @method projectSlots
     * @returns {void}
     *
     * @example Template with slots
     * ```typescript
     * return () => `
     *   <div>
     *     <slot name="header"></slot>
     *     <slot></slot>
     *     <slot name="footer"></slot>
     *   </div>
     * `;
     * ```
     *
     * @example Usage in HTML
     * ```html
     * <my-component>
     *   <h1 slot="header">Title</h1>
     *   <p>Default content</p>
     *   <footer slot="footer">Footer</footer>
     * </my-component>
     * ```
     *
     * @internal This method is called automatically during render
     */
    projectSlots(): void {
      const store = this._slotStore || new Map<string, Node[]>();
      const root = this._isShadowRoot ? (this._root as ShadowRoot) : this;
      const slotEls = root.querySelectorAll(
        `slot[data-scope-owner="${this._tagName}"]`
      );

      // Early exit if no slots
      if (slotEls.length === 0) return;

      // Use for loop instead of forEach + spread
      for (let i = 0; i < slotEls.length; i++) {
        const slotEl = slotEls[i];
        const name = slotEl.getAttribute('name') || '';
        const assigned = store.get(name) || [];

        if (assigned.length) {
          // Replace slot with assigned content (cloned to avoid moving original nodes)
          const frag = document.createDocumentFragment();
          // Use for loop instead of forEach
          for (let j = 0; j < assigned.length; j++) {
            const node = assigned[j];
            let nextNode: Node;
            if (
              node.nodeType === 1 &&
              (node as Element).tagName.includes('-') &&
              (node as any)._slotStore instanceof Map
            ) {
              const el = node as Element & { _slotStore: Map<string, Node[]> };
              const fresh = document.createElement(el.tagName.toLowerCase());
              for (let k = 0; k < el.attributes.length; k++) {
                const attr = el.attributes[k];
                fresh.setAttribute(attr.name, attr.value);
              }
              for (const slotNodes of el._slotStore.values()) {
                for (let s = 0; s < slotNodes.length; s++) {
                  fresh.appendChild(slotNodes[s].cloneNode(true));
                }
              }
              nextNode = fresh;
            } else {
              nextNode = node.cloneNode(true);
            }
            frag.appendChild(nextNode);
          }
          slotEl.replaceWith(frag);
        } else {
          // No assigned content, use default slot content
          // Convert to array first (childNodes is live NodeList)
          const defaultContent = slotEl.childNodes;
          const defaultNodes: Node[] = [];
          for (let j = 0; j < defaultContent.length; j++) {
            defaultNodes.push(defaultContent[j]);
          }

          if (defaultNodes.length > 0) {
            const frag = document.createDocumentFragment();
            // Use for loop instead of forEach
            for (let j = 0; j < defaultNodes.length; j++) {
              frag.appendChild(defaultNodes[j]);
            }
            slotEl.replaceWith(frag);
          }
        }
      }
    }

    /**
     * Sets up event delegation for dynamic content
     *
     * Event delegation allows handling events on elements that may not exist
     * at setup time. The event listener is attached to the root, and events
     * are matched against the selector.
     *
     * @method _delegate
     * @param {string} eventType - The event type (e.g., 'click', 'input', 'change')
     * @param {string} selector - CSS selector to match target elements
     * @param {function(Event, Element): void} handler - Handler function that receives (event, target)
     * @returns {void}
     *
     * @example
     * ```typescript
     * delegate('click', '.item', (e, target) => {
     *   console.log('Item clicked:', target);
     * });
     * ```
     *
     * @example Delegation for dynamic list items
     * ```typescript
     * delegate('click', '.list-item', (e, target) => {
     *   const id = target.getAttribute('data-id');
     *   console.log('Clicked item:', id);
     * });
     * ```
     *
     * @internal This method is called via context.delegate()
     */
    _delegate(
      eventType: string,
      selector: string,
      handler: (e: Event, target: Element) => void
    ): void {
      const key = `${eventType}::${selector}`;
      let info = this._delegated.get(key);

      if (!info) {
        // Create new delegation listener
        const listener = (e: Event) => {
          // Find closest matching element
          const target =
            e.target && (e.target as Element).closest
              ? (e.target as Element).closest(selector)
              : null;
          if (!target) return;

          // Call all handlers registered for this delegation
          for (const h of info!.handlers) {
            try {
              h(e, target);
            } catch {}
          }
        };

        info = { eventType, selector, listener, handlers: new Set() };
        this._delegated.set(key, info);
        this._root.addEventListener(eventType, listener);
      }

      // Add handler to the set
      info.handlers.add(handler);
    }

    /**
     * Removes event delegation handler
     *
     * @method _undelegate
     * @param {string} eventType - The event type
     * @param {string} selector - CSS selector
     * @param {function(Event, Element): void} handler - Handler function to remove
     * @returns {void}
     *
     * @internal This method is called via the cleanup function returned from delegate()
     */
    _undelegate(
      eventType: string,
      selector: string,
      handler: (e: Event, target: Element) => void
    ): void {
      const key = `${eventType}::${selector}`;
      const info = this._delegated.get(key);
      if (!info) return;

      // Remove handler from set
      info.handlers.delete(handler);

      // If no handlers left, remove event listener
      if (info.handlers.size === 0) {
        try {
          this._root.removeEventListener(eventType, info.listener);
        } catch {}
        this._delegated.delete(key);
      }
    }
  }

  // Define component immediately - custom elements auto-upgrade when defined
  if (!customElements.get(tagName)) {
    // Inject styles into head if provided
    if (styles && typeof document !== 'undefined') {
      const styleId = `scope-${tagName}-styles`;
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = styles;
        document.head.appendChild(style);
      }
    }

    try {
      customElements.define(tagName, TinyComponent);
    } catch (e: any) {
      warn('DEFINE_ERROR', String(e?.message || e));
    }
  } else if (process.env.NODE_ENV !== 'production') {
    console.warn(`[${tagName}] ALREADY_DEFINED: on saute la redéfinition.`);
  }
  return TinyComponent;
}

export { define, SCOPE_VERSION };
