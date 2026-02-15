import type { ComponentPlugin, ComponentContextBase } from '../../index';

/**
 * In-view handler signature.
 *
 * @example
 * ```ts
 * const handler: InViewHandler = (isInView, entry) => {
 *   if (isInView) entry.target.classList.add("is-in");
 * };
 * ```
 */
export type InViewHandler = (
  isInView: boolean,
  entry: IntersectionObserverEntry
) => void;

/**
 * Options for IntersectionObserver plus an immediate callback toggle.
 *
 * `immediate` controls whether the first observer callback is skipped.
 */
export type InViewOptions = IntersectionObserverInit & {
  immediate?: boolean;
};

/**
 * In-view plugin controls.
 *
 * @example
 * ```ts
 * import { inViewPlugin } from "@/lib/plugins/inview";
 *
 * define(
 *   "c-example",
 *   { plugins: [inViewPlugin()] },
 *   ({ onInView }) => {
 *     onInView((isInView) => {
 *       console.log("host in view:", isInView);
 *     });
 *     return () => "<div>...</div>";
 *   }
 * );
 * ```
 */
export type InViewControls = {
  /**
   * Observe the component host element.
   */
  onInView: (handler: InViewHandler, options?: InViewOptions) => () => void;
  /**
   * Observe a specific element (ref or any Element).
   */
  observeInView: (
    element: Element,
    handler: InViewHandler,
    options?: InViewOptions
  ) => () => void;
};

/**
 * In-view plugin based on IntersectionObserver.
 *
 * @example
 * ```ts
 * const { observeInView } = inViewPlugin().extend(ctx, host);
 * observeInView(el, (isInView) => {
 *   el.toggleAttribute("data-inview", isInView);
 * }, { rootMargin: "0px 0px -20% 0px" });
 * ```
 */
const inViewPlugin = (): ComponentPlugin<InViewControls> => ({
  name: 'inview',
  extend: (context: ComponentContextBase, host) => {
    const observers = new Set<IntersectionObserver>();

    const createObserver = (
      target: Element,
      handler: InViewHandler,
      options: InViewOptions = {}
    ) => {
      if (
        typeof window === 'undefined' ||
        typeof IntersectionObserver === 'undefined'
      ) {
        return () => {};
      }

      const { immediate = true, ...observerOptions } = options;
      let skipInitial = !immediate;

      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (entry.target !== target) continue;
          if (skipInitial) {
            skipInitial = false;
            continue;
          }
          handler(entry.isIntersecting, entry);
        }
      }, observerOptions);

      observer.observe(target);
      observers.add(observer);

      return () => {
        observer.unobserve(target);
        observer.disconnect();
        observers.delete(observer);
      };
    };

    const onInView: InViewControls['onInView'] = (handler, options) => {
      return createObserver(host as unknown as Element, handler, options);
    };

    const observeInView: InViewControls['observeInView'] = (
      element,
      handler,
      options
    ) => {
      return createObserver(element, handler, options);
    };

    context.onDestroy(() => {
      for (const observer of observers) observer.disconnect();
      observers.clear();
    });

    return { onInView, observeInView };
  },
});

export {
  inViewPlugin,
  type InViewControls as InViewPluginControls,
  type InViewHandler as InViewPluginHandler,
  type InViewOptions as InViewPluginOptions,
};
