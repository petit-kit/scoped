import type { ComponentPlugin, ComponentContextBase } from '../../index';

/**
 * Minimal Lenis instance interface used by this plugin.
 * Compatible with the Lenis smooth scroll library (lenis package).
 */
export interface LenisInstance {
  on(event: 'scroll', handler: (event: LenisScrollEvent) => void): void;
  off?(event: 'scroll', handler: (event: LenisScrollEvent) => void): void;
}

/**
 * Lenis scroll event payload.
 * Emitted on each scroll update with current scroll state.
 */
export interface LenisScrollEvent {
  scroll: number;
  limit: number;
  velocity: number;
  direction: number;
  progress: number;
}

/** Handler called on each Lenis scroll event. */
export type LenisScrollHandler = (event: LenisScrollEvent) => void;

/** Controls exposed to components when the lenis plugin is used. */
export type LenisControls = {
  /** Subscribe to Lenis scroll events. Returns an unsubscribe function. */
  onLenisScroll: (handler: LenisScrollHandler) => () => void;
};

/** Factory that returns the current Lenis instance (may be null before init). */
export type LenisGetter = () => LenisInstance | null | undefined;

/**
 * Plugin that wires components to Lenis smooth scroll events.
 *
 * @param getLenis - Function that returns the current Lenis instance
 * @returns A component plugin providing onLenisScroll
 */
export const lenisPlugin = (
  getLenis: LenisGetter
): ComponentPlugin<LenisControls> => ({
  name: 'lenis',
  extend: (context: ComponentContextBase) => {
    type ListenerEntry = {
      lenis: LenisInstance;
      handler: (event: LenisScrollEvent) => void;
    };
    const listeners = new Set<ListenerEntry>();

    const onLenisScroll: LenisControls['onLenisScroll'] = (handler) => {
      const lenis = getLenis();
      if (!lenis) return () => {};

      const wrapped = (event: LenisScrollEvent) => {
        handler(event);
      };

      lenis.on('scroll', wrapped);
      const entry: ListenerEntry = { lenis, handler: wrapped };
      listeners.add(entry);

      return () => {
        if (!listeners.has(entry)) return;
        listeners.delete(entry);
        if (typeof lenis.off === 'function') {
          lenis.off('scroll', wrapped);
        }
      };
    };

    context.onDestroy(() => {
      for (const { lenis, handler } of listeners) {
        if (typeof lenis.off === 'function') {
          lenis.off('scroll', handler);
        }
      }
      listeners.clear();
    });

    return { onLenisScroll };
  },
});
