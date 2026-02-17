import {
  type ComponentPlugin,
  type ComponentContextBase,
  timerPlugin,
} from '@petit-kit/scoped';
import Matter, { type Engine, type World, type Body } from 'matter-js';

/** Options for creating the Matter.js engine. */
export type MatterEngineOptions = {
  gravity?: { x?: number; y?: number; scale?: number };
  enableSleeping?: boolean;
};

/** Controls exposed to components when the matter plugin is used. */
export type MatterControls = {
  matter: {
    /** The Matter.js engine instance. */
    engine: Engine;
    /** The world composite (engine.world). */
    world: World;
    /** Matter.js Bodies factory for creating bodies. */
    Bodies: typeof Matter.Bodies;
    /** Matter.js Composite for managing bodies. */
    Composite: typeof Matter.Composite;
    /** Matter.js Body type. */
    Body: typeof Matter.Body;
    /**
     * Start the physics loop. Uses timer.raf internally.
     * Call stop() or rely on onDestroy to clean up.
     */
    run: () => void;
    /**
     * Stop the physics loop.
     */
    stop: () => void;
    /**
     * Add a body or array of bodies to the world.
     */
    add: (body: Body | Body[]) => void;
    /**
     * Remove a body or array of bodies from the world.
     */
    remove: (body: Body | Body[]) => void;
    /**
     * Subscribe to each physics tick (after Engine.update).
     * Receives delta time in ms. Returns unsubscribe function.
     */
    onMatterTick: (handler: (delta: number) => void) => () => void;
  };
};

/**
 * Matter.js plugin – 2D physics engine scoped to the component.
 *
 * Requires timerPlugin in the plugins array. Creates an engine and world,
 * runs the simulation via RAF, and cleans up on destroy.
 *
 * @example
 * ```ts
 * define("physics-demo", {
 *   plugins: [timerPlugin(), matterPlugin()],
 * }, ({ matter }) => {
 *   const ground = matter.Bodies.rectangle(400, 600, 800, 40, { isStatic: true });
 *   const box = matter.Bodies.rectangle(400, 200, 80, 80);
 *   matter.add([ground, box]);
 *   matter.run();
 *
 *   return () => `
 *     <div ref="canvas" style="position:relative;width:800px;height:600px">
 *       <div style="position:absolute;left:${box.position.x}px;top:${box.position.y}px">Box</div>
 *     </div>
 *   `;
 * });
 * ```
 */
export const matterPlugin = (
  options: MatterEngineOptions = {}
): ComponentPlugin<MatterControls> => ({
  name: 'matter',
  extend: (context: ComponentContextBase) => {
    const { timer } = timerPlugin().extend(context, context.host);

    const engine = Matter.Engine.create({
      gravity: options.gravity ?? { x: 0, y: 1, scale: 0.001 },
      enableSleeping: options.enableSleeping ?? false,
    });

    const world = engine.world;
    let stopRaf: (() => void) | null = null;
    const tickHandlers = new Set<(delta: number) => void>();

    const onMatterTick: MatterControls['matter']['onMatterTick'] = (handler) => {
      tickHandlers.add(handler);
      return () => tickHandlers.delete(handler);
    };

    const run: MatterControls['matter']['run'] = () => {
      if (stopRaf) return;
      stopRaf = timer.raf((_time: number, deltaTime: number) => {
        Matter.Engine.update(engine, deltaTime);
        for (const h of tickHandlers) h(deltaTime);
      });
    };

    const stop: MatterControls['matter']['stop'] = () => {
      if (stopRaf) {
        stopRaf();
        stopRaf = null;
      }
    };

    const add: MatterControls['matter']['add'] = (body) => {
      Matter.Composite.add(world, body);
    };

    const remove: MatterControls['matter']['remove'] = (body) => {
      Matter.Composite.remove(world, body);
    };

    context.onDestroy(() => {
      stop();
      tickHandlers.clear();
      Matter.Engine.clear(engine);
    });

    return {
      matter: {
        engine,
        world,
        Bodies: Matter.Bodies,
        Composite: Matter.Composite,
        Body: Matter.Body,
        run,
        stop,
        add,
        remove,
        onMatterTick,
      },
    };
  },
});
