import { define } from '@petit-kit/scoped';

define(
  'c-tabs',
  {
    props: {
      tabs: { type: Array, default: [] },
    },
  },
  ({ props, state, actions, host }) => {
    state.activeTab = 0;

    actions.handleTabClick = (e: Event) => {
      const index = (e.target as HTMLElement).dataset.index;
      host.setState({ activeTab: parseInt(index || '0') });
    };

    return () => `
      <div class="flex">
        ${props.tabs
          .map((tab: { title: string; content: string }, index: number) => {
            const isActive = state.activeTab === index;
            const classes = isActive
              ? 'bg-[blue] text-white'
              : '!bg-black/10 hover:!bg-black/20 transition-all duration-300 !text-blue';
            return `
              <button
                data-index="${index}"
                class="cursor-pointer  px-4 py-2 ${classes}"
                style="background-color: ${state.activeTab === index ? 'var(--color-blue)' : 'transparent'}"
                on:click="handleTabClick"
              >
                ${tab.title}
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }
);
