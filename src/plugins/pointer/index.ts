import type { ComponentPlugin, ComponentContextBase } from '../../index';
import { mousePlugin, type MouseControls } from '../mouse';
import { timerPlugin } from '../timer';
import { spring } from '@petit-kit/animate';

/** Velocity result with components (x, y) and magnitude. */
type VelocityResult = {
  x: number;
  y: number;
  magnitude: number;
};

/** Smoothed pointer position with velocity. */
export type PointerPosition = {
  x: number;
  y: number;
  v: number;
};

/** Handler for smoothed pointer move. Receives position and velocity magnitude. */
export type PointerMoveHandler = (pos: PointerPosition) => void;

/**
 * Pointer plugin controls. Combines raw mouse input with spring-smoothed position and velocity.
 *
 * @example
 * ```ts
 * define("cursor-follower", { plugins: [pointerPlugin()] }, ({ onPointerMove }) => {
 *   onPointerMove(({ x, y, v }) => {
 *     host.updateState({ cursorX: x, cursorY: y, speed: v });
 *   });
 *   return () => `<div style="left: {cursorX}px; top: {cursorY}px">...</div>`;
 * });
 * ```
 */
export type PointerControls = {
  /**
   * Subscribe to spring-smoothed pointer movement. Fires each frame when position changes.
   * Receives position (x, y) and velocity magnitude (v). Uses RAF internally.
   *
   * @example
   * ```ts
   * onPointerMove(({ x, y, v }) => {
   *   // Smooth position for cursor-following
   *   host.updateState({ posX: x, posY: y });
   *   // Use v for hover intensity or transition speed
   *   if (v > 5) setActive(true);
   * });
   * ```
   */
  onPointerMove: (handler: PointerMoveHandler) => void;
  /** Raw mouse move subscription (from mouse plugin). See MouseControls. */
  onMouseMove: MouseControls['onMouseMove'];
};

/** Internal state for pointer target and velocity tracking. */
type PointerTarget = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  v: number;
  rx: number;
  ry: number;
};

/** Spring physics parameters for pointer smoothing. */
type SpringParams = {
  stiffness: number;
  damping: number;
  mass: number;
};

let target: PointerTarget = {
  x: -1,
  y: -1,
  vx: 0,
  vy: 0,
  v: 0,
  rx: 0,
  ry: 0,
};

const springParams: SpringParams = {
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/**
 * Pointer plugin – spring-smoothed cursor position and velocity.
 *
 * Wraps the mouse plugin to provide smoothed pointer coordinates via spring physics.
 * `onPointerMove` fires on RAF when the smoothed position changes, and includes
 * velocity magnitude for effects (e.g., intensity, transitions).
 *
 * @example
 * ```ts
 * define("my-component", { plugins: [pointerPlugin()] }, ({ onPointerMove, onMouseMove }) => {
 *   onPointerMove(({ x, y, v }) => host.updateState({ cx: x, cy: y, velocity: v }));
 *   return () => `<div style="transform: translate({cx}px, {cy}px)">...</div>`;
 * });
 * ```
 */
export const pointerPlugin = (): ComponentPlugin<PointerControls> => ({
  name: 'pointer',
  extend: (context: ComponentContextBase) => {
    const { onMouseMove } = mousePlugin().extend(context, context.host);
    const { timer } = timerPlugin().extend(context, context.host);

    /** Initialize pointer target at viewport center. */
    target.x = window.innerWidth / 2;
    target.y = window.innerHeight / 2;

    /** Spring controllers for x and y position smoothing. */
    const ss = {
      x: spring({
        from: target.x,
        to: target.x,
        ...springParams,
      }),
      y: spring({
        from: target.y,
        to: target.y,
        ...springParams,
      }),
    };

    /** Update spring targets when mouse moves. */
    onMouseMove((x, y) => {
      ss.x.setTarget(x);
      ss.y.setTarget(y);
    });

    /** Subscribe to smoothed pointer position with velocity. Runs on RAF when position changes. */
    const onPointerMove: PointerControls['onPointerMove'] = (handler) => {
      let lastX = target.x;
      let lastY = target.y;
      timer.raf((t) => {
        const x = ss.x.next(t);
        const y = ss.y.next(t);
        if (lastX !== x || lastY !== y) {
          handler({
            x,
            y,
            v: computeVelocity({ x, y }, { x: lastX, y: lastY }).magnitude,
          });
          lastX = x;
          lastY = y;
        }
      });
    };

    return {
      onPointerMove,
      onMouseMove,
    };
  },
});

/** Computes velocity vector and magnitude between two positions. */
function computeVelocity(
  current: { x: number; y: number },
  previous: { x: number; y: number }
): VelocityResult {
  return {
    x: current.x - previous.x,
    y: current.y - previous.y,
    magnitude: Math.sqrt(
      (current.x - previous.x) * (current.x - previous.x) +
        (current.y - previous.y) * (current.y - previous.y)
    ),
  };
}
