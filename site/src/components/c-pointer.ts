import { define, pointerPlugin } from '@petit-kit/scoped';

define(
  'c-pointer',
  { plugins: [pointerPlugin()] },
  ({ state, onPointerMove, host, computed }) => {
    state.position = { x: 0, y: 0 };

    onPointerMove(({ x, y }) => {
      host.updateState({ position: { x, y } });
    });

    const horizontalStyle = computed(
      () => `transform: translateX(${state.position.x}px);`
    );
    const verticalStyle = computed(
      () => `transform: translateY(${state.position.y}px);`
    );
    const centerStyle = computed(
      () =>
        `transform: translate(${state.position.x}px, ${state.position.y}px);`
    );

    return () => `
    <div class="fixed w-screen h-screen pointer-events-none">
      <div
        class="absolute w-px h-screen bg-black rounded-full opacity-5" bind:style="${horizontalStyle}"></div>
      <div
        class="absolute w-screen h-px bg-black rounded-full opacity-5" bind:style="${verticalStyle}"></div>
      <div
        class="absolute w-2 h-2 -ml-1 -mt-1 bg-[#BF5735] rounded-full" bind:style="${centerStyle}"></div>
    </div>
  `;
  }
);
