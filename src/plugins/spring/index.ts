import type { ComponentPlugin, ComponentContextBase } from '../../index';
import { spring } from '@petit-kit/animate';
import { timerPlugin, type TimerControls } from '../timer';

// Types inferred from @petit-kit/animate spring (not re-exported by the package)
type SpringValue = number | number[] | Record<string, number>;
type SpringOptions<T extends SpringValue = number> = Parameters<
  typeof spring<T>
>[0];
type SpringController<T extends SpringValue = number> = ReturnType<
  typeof spring<T>
>;

export type SpringControls = {
  /**
   * Create an independent spring controller.
   *
   * @example
   * const springX = createSpring({ from: 0, to: 1, stiffness: 200 });
   * springX.setTarget(1);
   */
  createSpring: <T extends SpringValue>(
    options?: SpringOptions<T>
  ) => SpringController<T>;
  /**
   * Drive a spring controller on the scoped timer RAF.
   *
   * @example
   * const scale = createSpring({ from: 0, to: 1 });
   * const stop = runSpring(scale, (value) => {
   *   host.updateState({ scale: value });
   * });
   */
  runSpring: <T extends SpringValue>(
    controller: SpringController<T>,
    onUpdate: (value: T, controller: SpringController<T>) => void,
    options?: { fps?: number; immediate?: boolean; stopWhenDone?: boolean }
  ) => () => void;
};

/**
 * Scoped spring plugin built on top of the timer plugin.
 *
 * @example
 * define("my-component", { plugins: [springPlugin()] }, ({ createSpring, runSpring, host }) => {
 *   const scale = createSpring({ from: 0.8, to: 1 });
 *   runSpring(scale, (value) => host.updateState({ scale: value }));
 *   return () => `<div bind:style="transform: scale({scale})"></div>`;
 * });
 */
export const springPlugin = (): ComponentPlugin<SpringControls> => ({
  name: 'spring',
  extend: (context: ComponentContextBase) => {
    const { timer } = timerPlugin().extend(context, context.host) as {
      timer: TimerControls;
    };
    const runners = new Set<() => void>();

    // Lightweight factory so consumers don't import spring directly.
    const createSpring: SpringControls['createSpring'] = (options) =>
      spring(options);

    // Runs a spring on RAF and cleans up on destroy.
    const runSpring: SpringControls['runSpring'] = (
      controller,
      onUpdate,
      options = {}
    ) => {
      const { fps, immediate = true, stopWhenDone = true } = options;
      let stopped = false;
      let rafStop: (() => void) | null = null;

      if (immediate) {
        onUpdate(controller.getValue(), controller);
      }

      const startRaf = () => {
        if (rafStop) return;
        rafStop = timer.raf((time) => {
          if (stopped) return;
          const value = controller.next(time);
          onUpdate(value, controller);
          if (stopWhenDone && controller.isDone()) {
            stopRaf();
          }
        }, fps);
      };

      const stopRaf = () => {
        if (!rafStop) return;
        rafStop();
        rafStop = null;
      };

      startRaf();

      const resumeCleanup = controller.onResume(() => {
        if (stopped || !stopWhenDone) return;
        if (immediate) {
          onUpdate(controller.getValue(), controller);
        }
        startRaf();
      });

      const cleanup = () => {
        if (stopped) return;
        stopped = true;
        resumeCleanup();
        stopRaf();
        runners.delete(cleanup);
      };

      runners.add(cleanup);
      return cleanup;
    };

    context.onDestroy(() => {
      for (const stop of runners) stop();
      runners.clear();
    });

    return { createSpring, runSpring };
  },
});
