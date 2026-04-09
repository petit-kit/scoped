import type {
  ComponentContextBase,
  ComponentHost,
  ComponentPlugin,
} from '@petit-kit/scoped';

/**
 * Minimal Idiomorph API used by this plugin.
 * Compatible with the idiomorph package.
 */
export interface IdiomorphAPI {
  morph(target: Element, html: string, options?: Record<string, unknown>): void;
}

/** Factory that returns the Idiomorph instance to use for morphing. */
export type IdiomorphGetter = () => IdiomorphAPI;

/**
 * Options for the morph plugin.
 */
export type MorphOptions = {
  /**
   * Preserve the value of the focused input element during morph.
   * @default true
   */
  ignoreActiveValue?: boolean;
  /**
   * Additional callbacks forwarded to Idiomorph.
   *
   * @see https://github.com/bigskysoftware/idiomorph#callbacks
   */
  callbacks?: Record<string, (...args: any[]) => any>;
};

/**
 * Morph plugin controls.
 *
 * @example
 * ```ts
 * import { Idiomorph } from 'idiomorph';
 * import { morphPlugin } from "@/lib/plugins/morph";
 *
 * define(
 *   "c-search",
 *   { plugins: [morphPlugin(() => Idiomorph)] },
 *   ({ morph, state, actions, host }) => {
 *     state.query = "";
 *     actions.onInput = (e: Event) => {
 *       host.setState({ query: (e.target as HTMLInputElement).value });
 *     };
 *     return () => `
 *       <input type="text" on:input="onInput" />
 *       <p>Results for: {query}</p>
 *     `;
 *   }
 * );
 * ```
 */
/** Walk the prototype chain — `innerHTML` is not always an own property of `ShadowRoot` / `HTMLElement` prototypes. */
function getInnerHTMLDescriptor(
  root: HTMLElement | ShadowRoot
): PropertyDescriptor {
  let cur: object | null = root;
  while (cur) {
    const desc = Object.getOwnPropertyDescriptor(cur, 'innerHTML');
    if (desc?.set && desc?.get) {
      return desc;
    }
    cur = Object.getPrototypeOf(cur);
  }
  throw new Error(
    '[morph] Could not resolve innerHTML accessor for this render root'
  );
}

export type MorphControls = {
  /**
   * Morph the component root with the given HTML string.
   *
   * @example
   * ```ts
   * morph('<div class="updated">New content</div>');
   * ```
   */
  morph: (html: string) => void;
};

/**
 * DOM morphing plugin powered by Idiomorph.
 *
 * Intercepts `innerHTML` writes on the component root so that every
 * re-render after the initial mount patches the existing DOM in place
 * instead of replacing it. This preserves focus, selection, scroll
 * position and running CSS animations across re-renders.
 *
 * The first render always uses native `innerHTML` for speed since
 * there is no existing DOM state to preserve.
 *
 * @example Basic usage
 * ```ts
 * import { Idiomorph } from 'idiomorph';
 *
 * define("c-counter", { plugins: [morphPlugin(() => Idiomorph)] }, ({ state, actions, host }) => {
 *   state.count = 0;
 *   actions.increment = () => host.setState({ count: state.count + 1 });
 *   return () => `<button on:click="increment">Count: {count}</button>`;
 * });
 * ```
 *
 * @example With options
 * ```ts
 * define("c-editor", { plugins: [morphPlugin(() => Idiomorph, { ignoreActiveValue: false })] }, ({ host }) => {
 *   return () => `<textarea></textarea>`;
 * });
 * ```
 */
export const morphPlugin = (
  getIdiomorph: IdiomorphGetter,
  options: MorphOptions = {}
): ComponentPlugin<MorphControls> => ({
  name: 'morph',
  extend: (context: ComponentContextBase, host: ComponentHost) => {
    const { ignoreActiveValue = true, callbacks } = options;
    const Idiomorph = getIdiomorph();

    // @petit-kit/scoped stores the render target on `m` (host or shadow root) and `u` for shadow mode.
    // Older drafts used `_root` / `_isShadowRoot`; keep fallbacks for compatibility.
    const h = host as unknown as {
      m?: HTMLElement | ShadowRoot;
      _root?: HTMLElement | ShadowRoot;
      u?: boolean;
      _isShadowRoot?: boolean;
    };
    const root = h.m ?? h._root;

    if (root == null) {
      throw new Error(
        '[morph] Missing render root on host (expected host.m). Is @petit-kit/scoped up to date?'
      );
    }

    const nativeDesc = getInnerHTMLDescriptor(root);

    // Morph the component root children with the given HTML string.
    const morphRoot = (html: string) => {
      Idiomorph.morph(root as Element, html, {
        morphStyle: 'innerHTML',
        ignoreActiveValue,
        callbacks,
      });
    };

    // First render flag — native innerHTML on mount, morph after.
    let firstWrite = true;

    // Override innerHTML on the root instance so scoped's update()
    // transparently morphs without any change to the core library.
    Object.defineProperty(root, 'innerHTML', {
      set(html: string) {
        if (firstWrite) {
          nativeDesc.set!.call(this, html);
          firstWrite = false;
        } else {
          morphRoot(html);
        }
      },
      get() {
        return nativeDesc.get!.call(this);
      },
      configurable: true,
    });

    // Restore native innerHTML on destroy.
    context.onDestroy(() => {
      delete (root as any).innerHTML;
    });

    return { morph: morphRoot };
  },
});
