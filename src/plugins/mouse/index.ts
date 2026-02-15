import type { ComponentPlugin, ComponentContextBase } from '../../index';

/** Handler for mouse move, down, and up events. Receives client coordinates and the native event. */
export type MouseEventHandler = (
  x: number,
  y: number,
  event: MouseEvent
) => void;

/** Handler for wheel events. Receives client coordinates, scroll delta, and the native event. */
export type MouseWheelHandler = (
  x: number,
  y: number,
  deltaY: number,
  event: WheelEvent
) => void;

/** Unsubscribe function returned by each mouse listener. Call to remove the listener. */
export type MouseUnsubscribe = () => void;

/**
 * Mouse plugin controls. All listeners are bound to `window` and cleaned up on component destroy.
 *
 * @example
 * ```ts
 * define("cursor-follower", { plugins: [mousePlugin()] }, ({ onMouseMove, host }) => {
 *   const stop = onMouseMove((x, y) => {
 *     host.updateState({ cursorX: x, cursorY: y });
 *   });
 *   return () => `<div style="left: {cursorX}px; top: {cursorY}px">...</div>`;
 * });
 * ```
 *
 * @example
 * ```ts
 * // Parallax on scroll
 * onMouseWheel((x, y, deltaY) => {
 *   parallaxOffset += deltaY * 0.1;
 * });
 * ```
 */
export type MouseControls = {
  /**
   * Subscribe to global mouse move. Returns an unsubscribe function.
   *
   * @example
   * ```ts
   * const stop = onMouseMove((x, y) => {
   *   console.log(`cursor at ${x}, ${y}`);
   * });
   * // later: stop();
   * ```
   */
  onMouseMove: (handler: MouseEventHandler) => MouseUnsubscribe;
  /**
   * Subscribe to global mouse down. Returns an unsubscribe function.
   *
   * @example
   * ```ts
   * onMouseDown((x, y, e) => {
   *   if (e.button === 0) startDrag(x, y);
   * });
   * ```
   */
  onMouseDown: (handler: MouseEventHandler) => MouseUnsubscribe;
  /**
   * Subscribe to global mouse up. Returns an unsubscribe function.
   *
   * @example
   * ```ts
   * onMouseUp(() => endDrag());
   * ```
   */
  onMouseUp: (handler: MouseEventHandler) => MouseUnsubscribe;
  /**
   * Subscribe to global wheel events. Returns an unsubscribe function.
   *
   * @example
   * ```ts
   * onMouseWheel((x, y, deltaY) => {
   *   zoomLevel += deltaY > 0 ? -0.1 : 0.1;
   * });
   * ```
   */
  onMouseWheel: (handler: MouseWheelHandler) => MouseUnsubscribe;
};

/**
 * Mouse plugin – global mouse and wheel listeners with automatic cleanup.
 *
 * Listeners are attached to `window`. All subscriptions are removed when the
 * component is destroyed. Safe to use in SSR (no-op when `window` is undefined).
 *
 * @example
 * ```ts
 * define("my-component", { plugins: [mousePlugin()] }, ({ onMouseMove, onMouseDown, onMouseUp }) => {
 *   onMouseMove((x, y) => updateCursor(x, y));
 *   onMouseDown((x, y, e) => e.button === 0 && startDrag(x, y));
 *   onMouseUp(() => endDrag());
 *   return () => `<div>...</div>`;
 * });
 * ```
 */
export const mousePlugin = (): ComponentPlugin<MouseControls> => ({
  name: 'mouse',
  extend: (context: ComponentContextBase) => {
    /** Tracks listeners by event type for cleanup on destroy. */
    const listeners = new Map<string, Set<EventListener>>();

    /** Registers a mouse event listener (mousemove, mousedown, mouseup). No-op in SSR. */
    const add = (
      type: 'mousemove' | 'mousedown' | 'mouseup',
      handler: MouseEventHandler
    ): MouseUnsubscribe => {
      if (typeof window === 'undefined') return () => {};
      const wrapped: EventListener = (event) => {
        const mouseEvent = event as MouseEvent;
        handler(mouseEvent.clientX, mouseEvent.clientY, mouseEvent);
      };
      window.addEventListener(type, wrapped);
      let set = listeners.get(type);
      if (!set) {
        set = new Set();
        listeners.set(type, set);
      }
      set.add(wrapped);
      return () => {
        window.removeEventListener(type, wrapped);
        set?.delete(wrapped);
      };
    };

    /** Registers a wheel event listener. No-op in SSR. */
    const addWheel = (handler: MouseWheelHandler): MouseUnsubscribe => {
      if (typeof window === 'undefined') return () => {};
      const wrapped: EventListener = (event) => {
        const wheelEvent = event as WheelEvent;
        handler(
          wheelEvent.clientX,
          wheelEvent.clientY,
          wheelEvent.deltaY,
          wheelEvent
        );
      };
      window.addEventListener('wheel', wrapped);
      let set = listeners.get('wheel');
      if (!set) {
        set = new Set();
        listeners.set('wheel', set);
      }
      set.add(wrapped);
      return () => {
        window.removeEventListener('wheel', wrapped);
        set?.delete(wrapped);
      };
    };

    /** Remove all listeners when the component is destroyed. */
    context.onDestroy(() => {
      if (typeof window === 'undefined') return;
      for (const [type, set] of listeners) {
        for (const handler of set) {
          window.removeEventListener(type, handler);
        }
        set.clear();
      }
      listeners.clear();
    });

    return {
      onMouseMove: (handler) => add('mousemove', handler),
      onMouseDown: (handler) => add('mousedown', handler),
      onMouseUp: (handler) => add('mouseup', handler),
      onMouseWheel: (handler) => addWheel(handler),
    };
  },
});
