import type { ComponentPlugin, ComponentContextBase } from '../../index';

export type WindowControls = {
  // Uses window "resize" events; best for viewport-only changes.
  // Example:
  // const { onViewportResize } = windowPlugin().extend(context, context);
  // onViewportResize((w, h) => {
  //   console.log("viewport", w, h);
  // });
  onViewportResize: (
    handler: (width: number, height: number, event: UIEvent) => void,
    options?: { immediate?: boolean }
  ) => () => void;
  // Uses ResizeObserver on <html>; captures layout changes that affect size
  // even when no window "resize" event fires (e.g. scrollbars).
  // Example:
  // const { onWindowResize } = windowPlugin().extend(context, context);
  // const stop = onWindowResize((w, h) => {
  //   console.log("window", w, h);
  // });
  // stop(); // unsubscribe
  onWindowResize: (
    handler: (
      width: number,
      height: number,
      event: UIEvent | ResizeObserverEntry
    ) => void,
    options?: { immediate?: boolean }
  ) => () => void;
};

export const windowPlugin = (): ComponentPlugin<WindowControls> => ({
  name: 'window',
  extend: (context: ComponentContextBase) => {
    const listeners = new Set<(event: UIEvent) => void>();
    const observers = new Set<ResizeObserver>();

    const onViewportResize: WindowControls['onViewportResize'] = (
      handler: (width: number, height: number, event: UIEvent) => void,
      options = {}
    ) => {
      if (typeof window === 'undefined') return () => {};
      const { immediate = true } = options;
      // Wrap to provide width/height for each resize event.
      const wrapped = (event: UIEvent) => {
        handler(window.innerWidth, window.innerHeight, event);
      };
      window.addEventListener('resize', wrapped);
      listeners.add(wrapped);
      if (immediate) {
        wrapped(new UIEvent('resize'));
      }
      return () => {
        window.removeEventListener('resize', wrapped);
        listeners.delete(wrapped);
      };
    };

    const onWindowResize: WindowControls['onWindowResize'] = (
      handler: (
        width: number,
        height: number,
        event: UIEvent | ResizeObserverEntry
      ) => void,
      options = {}
    ) => {
      if (typeof window === 'undefined') return () => {};
      if (typeof ResizeObserver === 'undefined') {
        // Fallback when ResizeObserver is not supported.
        return onViewportResize(
          (width, height, event) => handler(width, height, event),
          options
        );
      }
      const { immediate = true } = options;
      // Observe the root element to track viewport-affecting changes.
      const observedElement = document.documentElement;
      const observer = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        const { width, height } = entry.contentRect;
        handler(width, height, entry);
      });
      observer.observe(observedElement);
      observers.add(observer);
      if (immediate) {
        const rect = observedElement.getBoundingClientRect();
        handler(rect.width, rect.height, new UIEvent('resize'));
      }
      return () => {
        observer.disconnect();
        observers.delete(observer);
      };
    };

    context.onDestroy(() => {
      if (typeof window === 'undefined') return;
      for (const handler of listeners) {
        window.removeEventListener('resize', handler);
      }
      listeners.clear();
      for (const observer of observers) {
        observer.disconnect();
      }
      observers.clear();
    });

    return { onViewportResize, onWindowResize };
  },
});
