import { define } from '@petit-kit/scoped';

import './code.ts';
import '../../c-tabs.ts';

import code from './code.ts?raw';

define('c-example-slider', {}, ({ onMount, refs }) => {
  // const tabs = [
  //   {
  //     title: 'TypeScript',
  //     content: code,
  //   },
  //   {
  //     title: 'JS',
  //     content:
  //       'JavaScript is a programming language that allows you to implement complex features on web pages.',
  //   },
  // ];

  onMount(() => {
    const tabs: any = refs.tabs;
    console.log(tabs, refs);
  });

  return () => `
    <div ref="container">
      <c-slider
        class="flex flex-col items-center gap-5"
        value="90"
      ></c-slider>
      <c-tabs ref="tabs"></c-tabs>
    </div>
  `;
});
