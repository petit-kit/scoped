import type { ComponentPlugin, ComponentContextBase } from '../../index';
import { lerp } from '@petit-kit/animate';
import { timerPlugin, type TimerControls } from '../timer';

// Types inferred from @petit-kit/animate lerp (not re-exported by the package)
type LerpValue = number | number[] | Record<string, number>;
type LerpOptions<T extends LerpValue = number> = Parameters<typeof lerp<T>>[0];
type LerpController<T extends LerpValue = number> = ReturnType<typeof lerp<T>>;

export type LerpControls = {
  /**
   * Create an independent lerp controller.
   *
   * @example
   * const lerpX = createLerp({ from: 0, to: 1, lerp: 0.2 });
   * lerpX.setTarget(1);
   */
  createLerp: <T extends LerpValue>(
    options?: LerpOptions<T>
  ) => LerpController<T>;
  /**
   * Drive a lerp controller on the scoped timer RAF.
   *
   * @example
   * const opacity = createLerp({ from: 0, to: 1 });
   * const stop = runLerp(opacity, (value) => {
   *   host.updateState({ opacity: value });
   * });
   */
  runLerp: <T extends LerpValue>(
    controller: LerpController<T>,
    onUpdate: (value: T, controller: LerpController<T>) => void,
    options?: { fps?: number; immediate?: boolean; stopWhenDone?: boolean }
  ) => () => void;
};

/**
 * Scoped lerp plugin built on top of the timer plugin.
 *
 * @example
 * define("my-component", { plugins: [lerpPlugin()] }, ({ createLerp, runLerp, host }) => {
 *   const opacity = createLerp({ from: 0, to: 1 });
 *   runLerp(opacity, (value) => host.updateState({ opacity: value }));
 *   return () => `<div bind:style="opacity: {opacity}"></div>`;
 * });
 */
export const lerpPlugin = (): ComponentPlugin<LerpControls> => ({
  name: 'lerp',
  extend: (context: ComponentContextBase) => {
    const { timer } = timerPlugin().extend(context, context.host) as {
      timer: TimerControls;
    };
    const runners = new Set<() => void>();

    // Lightweight factory so consumers don't import lerp directly.
    const createLerp: LerpControls['createLerp'] = (options) => lerp(options);

    // Runs a lerp on RAF and cleans up on destroy.
    const runLerp: LerpControls['runLerp'] = (
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

    return { createLerp, runLerp };
  },
});
