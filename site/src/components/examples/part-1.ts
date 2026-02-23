import { define, springPlugin } from '@petit-kit/scoped';
import { clamp } from '../../lib/utils';

define(
  'c-example-slider',
  {
    props: { value: { type: Number, default: 90 } },
  },
  ({ link, emit, actions, host }) => {
    link('value', 'value');

    actions.handleChange = (event: any) => {
      host.updateState({ value: event.target.valueAsNumber });
      emit('on-change', { value: event.target.valueAsNumber });
    };

    return () => `
      <div class="flex flex-col items-center gap-5 w-[300px]">
        <c-rotating-box bind:value="value"></c-rotating-box>
        <c-rolling-number bind:value="value"></c-rolling-number>
        <input
          type="range" min="0" max="360" step="5"
          bind:value="value"
          on:input="handleChange"
        />
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
    const spring: SpringController<number> = createSpring({
      from: 0,
      to: 0,
      stiffness: 300,
      damping: 30,
      mass: 1,
    });

    const numbers = computed(() => {
      return Array.from(
        { length: props.max - props.min + 1 },
        (_, i) => props.min + i
      );
    });

    onPropsChanged(() => {
      const index = props.max - props.value;
      spring.setTarget(index);
    });

    runSpring(spring, (value: number) => {
      const index = value;
      const container = refs.container as HTMLElement;

      if (container) {
        container.style.transform = `translateY(-${index * 36}px)`;
      }

      const numbers = host.$('[ref="number"]') as HTMLElement[];
      if (numbers) {
        (numbers as HTMLElement[]).forEach((number: HTMLElement) => {
          number.style.opacity = '0.5';
        });
        let roundedIndex = clamp(0, Math.round(index), numbers.length - 1);
        if (numbers[roundedIndex] as HTMLElement)
          (numbers as HTMLElement[])[roundedIndex].style.opacity = '1';
      }
    });

    return () => `
      <div
        class="overflow-hidden h-[80px] pt-[12px] roll-mask"
      >
        <div ref="container">
          ${numbers()
            .reverse()
            .map(
              (number) =>
                `<div ref="number" data-index="${number}" class="sub-title font-bold! w-[4ch] text-center h-[36px] leading-[36px] roll-mask-item transition-opacity duration-50">${number}</div>`
            )
            .join('')}
        </div>
      </div>
    `;
  }
);

define(
  'c-rotating-box',
  {
    props: { value: { type: Number, default: 0 } },
    plugins: [springPlugin()],
  },
  ({ props, state, onPropsChanged, createSpring, runSpring, host }) => {
    state.style = `transform: rotate(${props.value}deg)`;
    const spring = createSpring({ from: 0, to: props.value, stiffness: 200 });

    onPropsChanged(() => spring.setTarget(props.value));

    runSpring(spring, (value: number) => {
      host.updateState({
        style: `transform: rotate(${value}deg)`,
      });
    });

    return () => `
      <div class="w-20 h-20 bg-[#0048f2] shadow-md rounded-full flex items-center justify-center" bind:style="style">
        <div class="w-[3px] h-[25px] bg-white rounded-full mt-[-40px] shadow-md"></div>
      </div>
    `;
  }
);

define('c-example-1', {}, () => {
  return () => `
    <c-example-slider ref="slider"></c-example-slider>
  `;
});
