import { define, springPlugin } from '@petit-kit/scoped';
import { clamp, debounce } from '../../../lib/utils';

define(
  'c-slider',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
      step: { type: Number, default: 1 },
    },
  },
  ({ actions, host, props, link }) => {
    link('value', 'value');

    actions.handleChange = (e: any) =>
      host.updateState({ value: e.target.valueAsNumber });

    actions.handleKnobChange = (e: any) =>
      host.updateState({
        value: Math.round(clamp(props.min, e.detail.value, props.max)),
      });

    return () => `
      <div class="flex flex-col items-center gap-10 w-[300px]">
        <div class="flex items-center gap-5">
          <c-knob bind:value="value" on:change="handleKnobChange"></c-knob>
          <c-rolling-number bind:value="value"></c-rolling-number>
        </div>
        <input
          id="example-input"
          type="range" min="${props.min}" max="${props.max}" step="${props.step}"
          bind:value="value" on:input="handleChange"
        />
        <c-tooltip bind:value="value" min="${props.min}" max="${props.max}"></c-tooltip>
      </div>
    `;
  }
);

define(
  'c-rolling-number',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
      step: { type: Number, default: 5 },
    },
    plugins: [springPlugin()],
  },
  ({
    computed,
    props,
    onPropsChanged,
    refs,
    createSpring,
    runSpring,
    host,
  }) => {
    const spring: any = createSpring({
      from: props.max - props.value,
      to: props.max - props.value,
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    });

    onPropsChanged(() => spring.setTarget(props.max - props.value));

    const numbers = computed(() =>
      Array.from({ length: props.max - props.min + 1 }, (_, i) => props.min + i)
    );

    runSpring(spring, (index: number) => {
      const c = refs.container as HTMLElement;

      if (c) c.style.transform = `translate3d(0, ${-index * 36}px, 0)`;
      const els = host.$('[ref="number"]') as HTMLElement[];

      if (els) {
        els.forEach((el) => (el.style.opacity = '0.5'));
        const ri = clamp(0, Math.round(index), Infinity);
        if (els[ri]) els[ri].style.opacity = '1';
      }
    });

    return () => `
      <div class="overflow-hidden h-[80px] pt-[20px] roll-mask">
        <div ref="container">
          ${numbers()
            .reverse()
            .map(
              (n: number) => `
                <div
                  ref="number"
                  class=" 
                    text-[40px] font-bold! w-[4ch] text-center h-[36px] leading-[36px]
                    roll-mask-item transition-opacity duration-50
                  "
                >
                  ${n}
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    `;
  }
);

define(
  'c-knob',
  { props: { value: { type: Number, default: 0 } }, plugins: [springPlugin()] },
  ({
    props,
    state,
    onPropsChanged,
    createSpring,
    runSpring,
    host,
    effect,
    actions,
    emit,
  }) => {
    state.active = false;
    state.style = `transform: rotate(${props.value}deg)`;

    const spring = createSpring({
      from: props.value,
      to: props.value,
      stiffness: 200,
    });
    runSpring(spring, (v: number) =>
      host.updateState({ style: `transform: rotate(${180 + v}deg)` })
    );

    onPropsChanged(() => spring.setTarget(props.value));

    let last = 0;
    effect(() => {
      const onMove = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!state.active) return;
        const r = host.getBoundingClientRect();
        const p = (e.y - (r.top + r.height / 2)) / r.height;
        emit('change', { value: props.value + ((p - last) / 2) * 360 });
        last = p;
      };
      window.addEventListener('pointermove', onMove);
      return () => window.removeEventListener('pointermove', onMove);
    }, [state.active]);

    const setBody = (cursor: string, userSelect: string) => {
      document.body.style.cursor = cursor;
      document.body.style.userSelect = userSelect;
    };

    actions.handlePointerDown = (e: PointerEvent) => {
      e.preventDefault();
      e.stopPropagation();
      host.updateState({ active: true });
      setBody('grabbing', 'none');

      const stop = () => {
        last = 0;
        host.updateState({ active: false });
        setBody('default', 'auto');
      };

      window.addEventListener('pointerup', stop);
      return () => window.removeEventListener('pointerup', stop);
    };

    return () => `
      <div
        class="w-20 h-20 bg-[#0048f2] rounded-full flex items-center justify-center"
        bind:style="style"
        on:pointerdown="handlePointerDown"
      >
        <div
          class="w-[3px] h-[25px] bg-white rounded-full mt-[-40px] shadow-md"
        ></div>
      </div>
    `;
  }
);

define(
  'c-tooltip',
  {
    props: {
      value: { type: Number, default: 0 },
      min: { type: Number, default: 0 },
      max: { type: Number, default: 360 },
    },
    plugins: [springPlugin()],
  },
  ({ props, state, onPropsChanged, refs, host, createSpring, runSpring }) => {
    state.value = props.value;

    host.style.position = 'relative';
    host.style.width = '100%';

    const value: any = createSpring({
      from: props.value,
      to: props.value,
      stiffness: 300,
      damping: 30,
      mass: 0.5,
    });

    const rotation: any = createSpring({
      from: 0,
      to: 0,
      stiffness: 500,
      damping: 20,
      mass: 10,
    });

    let targetRotation: number = 0;
    let lastValue = props.value;

    const debouncedStop = debounce(() => {
      rotation.setTarget(0);
    }, 50);

    const move = (value: number) => {
      const percent = (value - props.min) / (props.max - props.min);
      const tooltip = refs.tooltip as HTMLElement;
      if (tooltip) tooltip.style.left = `${percent * 100}%`;
    };

    onPropsChanged(() => {
      move(props.value);
      value.setTarget(props.value);

      const diff: number = props.value - lastValue;
      targetRotation = clamp(-300, diff, 300);
      rotation.setTarget(targetRotation);
      lastValue = props.value;

      debouncedStop();
    });

    runSpring(rotation, (value: number) => {
      const tooltip = refs.tooltip as HTMLElement;
      if (tooltip) tooltip.style.transform = `rotate(${value}deg)`;
    });

    runSpring(value, (value: number) => {
      host.updateState({
        value: Math.round(clamp(props.min, value, props.max)),
      });
    });

    return () => `
      <div class="relative w-[calc(100%-20px)] ml-[10px] h-4 -mt-[25px]">
        <div
          ref="tooltip"
          class="absolute top-0 left-0 text-center bg-[#0048f2] translate-x-[-50%] w-[50px] px-6 py-1 flex items-center justify-center rounded-md shadow-md"
          style="transform-origin: center -26px;"
        >
          <div
            class="absolute w-[15px] h-[10px] left-1/2 top-0 -translate-x-1/2 [aspect-ratio:1/cos(30deg)] [clip-path:polygon(50%_0,100%_100%,0_100%)] bg-[#0048f2] -translate-y-[calc(100%-1px)] "
          ></div>
          <span class="font-bold text-white" bind:text="value"></span>
        </div>
      </div>
    `;
  }
);
