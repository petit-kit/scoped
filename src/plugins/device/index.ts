import type { ComponentPlugin, ComponentContextBase } from '../../index';

export type DeviceControls = {
  // Subscribes to a CSS media query and fires the handler whenever the match
  // state changes. Returns an unsubscribe function.
  // Example:
  // const { onMediaQuery } = devicePlugin().extend(context, context);
  // const stop = onMediaQuery("(max-width: 768px)", (matches) => {
  //   console.log("mobile:", matches);
  // });
  // stop(); // unsubscribe
  onMediaQuery: (
    query: string,
    handler: (matches: boolean, event: MediaQueryListEvent | null) => void,
    options?: { immediate?: boolean }
  ) => () => void;
};

export const devicePlugin = (): ComponentPlugin<DeviceControls> => ({
  name: 'device',
  extend: (context: ComponentContextBase) => {
    const mediaQueries = new Map<
      MediaQueryList,
      (event: MediaQueryListEvent) => void
    >();

    const onMediaQuery: DeviceControls['onMediaQuery'] = (
      query: string,
      handler: (matches: boolean, event: MediaQueryListEvent | null) => void,
      options = {}
    ) => {
      if (typeof window === 'undefined' || typeof matchMedia === 'undefined')
        return () => {};

      const { immediate = true } = options;
      const mql = matchMedia(query);

      const wrapped = (event: MediaQueryListEvent) => {
        handler(event.matches, event);
      };

      mql.addEventListener('change', wrapped);
      mediaQueries.set(mql, wrapped);

      if (immediate) {
        handler(mql.matches, null);
      }

      return () => {
        mql.removeEventListener('change', wrapped);
        mediaQueries.delete(mql);
      };
    };

    context.onDestroy(() => {
      for (const [mql, handler] of mediaQueries) {
        mql.removeEventListener('change', handler);
      }
      mediaQueries.clear();
    });

    return { onMediaQuery };
  },
});
