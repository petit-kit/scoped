import { define } from '@petit-kit/scoped';
import hljs from 'highlight.js/lib/core';

const size = 'h-[500px] md:h-[800px]';

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
      <div class="w-full overflow-hidden block">
        <div class="flex relative z-10 border-b border-black/10">
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
        <div class="text-left -mt-[15px]">
          ${
            props.tabs[state.activeTab].type === 'output'
              ? `
            <div class="w-full mb-0! ${size} flex items-center justify-center">
              ${props.tabs[state.activeTab].content}
            </div>
          `
              : `
            <pre class="w-full mb-0! ${size} rounded-t-none!">
              <code class="hljs language-${props.tabs[state.activeTab].language || 'typescript'} ${size} ml-0!">
${
  hljs.highlight(props.tabs[state.activeTab].content, {
    language: props.tabs[state.activeTab].language || 'typescript',
  }).value
}
              </code>
            </pre>
          `
          }
        </div>
      </div>
    `;
  }
);
