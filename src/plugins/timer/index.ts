import type { ComponentPlugin, ComponentContextBase } from '../../index';

/** Handle returned by `timer.setTimeout`. Use with `clearTimeout` if needed before destroy. */
export type TimerTimeoutHandle = ReturnType<typeof setTimeout>;

/** Handle returned by `timer.setInterval`. Use with `clearInterval` if needed before destroy. */
export type TimerIntervalHandle = ReturnType<typeof setInterval>;

/** Callback for `timer.raf`. Receives high-res timestamp and time since last frame (ms). */
export type TimerRafCallback = (time: number, deltaTime: number) => void;

/** Unsubscribe function returned by `timer.raf`. Call to stop the animation loop. */
export type TimerRafUnsubscribe = () => void;

/**
 * Timer plugin controls. All timeouts, intervals, and RAF loops are cleared on component destroy.
 *
 * @example
 * ```ts
 * define("delayed-tooltip", { plugins: [timerPlugin()] }, ({ timer }) => {
 *   timer.setTimeout(() => showTooltip(), 500);
 *   timer.raf((time, dt) => updateAnimation(dt));
 *   return () => `<div>...</div>`;
 * });
 * ```
 */
export type TimerControls = {
  /**
   * Scoped `setTimeout`. Cleared automatically on component destroy.
   *
   * @example
   * ```ts
   * const id = timer.setTimeout(() => doSomething(), 1000);
   * // or with args: timer.setTimeout((a, b) => log(a, b), 500, "hello", 42);
   * ```
   */
  setTimeout: (
    cb: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => TimerTimeoutHandle;
  /**
   * Scoped `setInterval`. Cleared automatically on component destroy.
   *
   * @example
   * ```ts
   * timer.setInterval(() => tick(), 1000);
   * ```
   */
  setInterval: (
    cb: (...args: unknown[]) => void,
    delay?: number,
    ...args: unknown[]
  ) => TimerIntervalHandle;
  /**
   * RequestAnimationFrame loop. Optionally throttle to a target FPS.
   * Returns an unsubscribe function to stop the loop early.
   *
   * @example
   * ```ts
   * const stop = timer.raf((time, deltaTime) => {
   *   position += velocity * (deltaTime / 1000);
   * });
   * // later: stop();
   * ```
   *
   * @example
   * ```ts
   * // Throttle to 30 FPS
   * timer.raf((time, dt) => update(dt), 30);
   * ```
   */
  raf: (cb: TimerRafCallback, fps?: number) => TimerRafUnsubscribe;
};

/**
 * Timer plugin – scoped setTimeout, setInterval, and RAF with automatic cleanup.
 *
 * All timers are cleared when the component is destroyed. The RAF loop supports
 * optional FPS throttling for performance-sensitive animations.
 *
 * @example
 * ```ts
 * define("my-component", { plugins: [timerPlugin()] }, ({ timer }) => {
 *   timer.setTimeout(() => host.updateState({ ready: true }), 2000);
 *   const stop = timer.raf((time, dt) => {
 *     host.updateState({ elapsed: time });
 *   });
 *   return () => `<div>{elapsed}</div>`;
 * });
 * ```
 */
export const timerPlugin = (): ComponentPlugin<{ timer: TimerControls }> => ({
  name: 'timer',
  extend: (context: ComponentContextBase) => {
    const timeouts = new Set<TimerTimeoutHandle>();
    const intervals = new Set<TimerIntervalHandle>();
    const rafs = new Set<number>();

    const timer: TimerControls = {
      setTimeout: (cb, delay, ...args) => {
        let id: TimerTimeoutHandle;
        const wrapped = (...innerArgs: unknown[]) => {
          timeouts.delete(id);
          cb(...innerArgs);
        };
        id = setTimeout(wrapped, delay, ...args);
        timeouts.add(id);
        return id;
      },
      setInterval: (cb, delay, ...args) => {
        const id = setInterval(cb, delay, ...args);
        intervals.add(id);
        return id;
      },
      raf: (cb, fps) => {
        let id = 0;
        let active = true;
        let lastTime = 0;
        /** Throttle interval in ms when fps is set. 0 = no throttle. */
        const frameDuration =
          typeof fps === 'number' && fps > 0 ? 1000 / fps : 0;

        const tick = (time: number) => {
          rafs.delete(id);
          if (!active) return;

          if (!frameDuration) {
            const deltaTime = lastTime ? time - lastTime : 0;
            lastTime = time;
            cb(time, deltaTime);
          } else if (time - lastTime >= frameDuration) {
            const deltaTime = lastTime ? time - lastTime : frameDuration;
            lastTime = time;
            cb(time, deltaTime);
          }

          id = requestAnimationFrame(tick);
          rafs.add(id);
        };

        id = requestAnimationFrame(tick);
        rafs.add(id);

        return () => {
          if (!active) return;
          active = false;
          rafs.delete(id);
          cancelAnimationFrame(id);
        };
      },
    };

    /** Clear all timers when the component is destroyed. */
    context.onDestroy(() => {
      for (const id of timeouts) clearTimeout(id);
      timeouts.clear();
      for (const id of intervals) clearInterval(id);
      intervals.clear();
      for (const id of rafs) cancelAnimationFrame(id);
      rafs.clear();
    });

    return { timer };
  },
});
