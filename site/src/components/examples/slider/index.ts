import { define } from '@petit-kit/scoped';

import './code.ts';
import '../../c-tabs.ts';

import code from './code.ts?raw';

define('c-example-slider', {}, ({ onMount, refs }) => {
  onMount(() => {
    const tabs: any = refs.tabs;
    tabs.setProps({
      tabs: [
        {
          title: 'Output',
          type: 'output',
          content: `
            <c-slider
              class="flex flex-col items-center gap-5"
              value="90"
            ></c-slider>
          `.trim(),
        },
        {
          title: 'TypeScript',
          language: 'typescript',
          content: code,
        },
        {
          title: 'DOM',
          language: 'xml',
          content: `
            <c-slider
  class="flex flex-col items-center gap-5"
  value="90"
></c-slider>
          `.trim(),
        },
      ],
    });
  });

  return () => `
    <div ref="container">
      <c-tabs ref="tabs"></c-tabs>
    </div>
  `;
});
