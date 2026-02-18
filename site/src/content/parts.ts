import { SCOPE_VERSION } from '@petit-kit/scoped';

import text1 from '../../../doc/1_intro.md?raw';
import text2 from '../../../doc/2_installation.md?raw';
import text3 from '../../../doc/3_getting_started.md?raw';
import text4 from '../../../doc/4_component_options.md?raw';
import text5 from '../../../doc/5_setup_function.md?raw';
import text6 from '../../../doc/6_templating.md?raw';
import text7 from '../../../doc/7_state_props.md?raw';
import text8 from '../../../doc/8_effects.md?raw';
import text9 from '../../../doc/9_computed.md?raw';
import text10 from '../../../doc/10_custom_events.md?raw';
import text11 from '../../../doc/11_event_delegation.md?raw';
import text12 from '../../../doc/12_slots.md?raw';
import text13 from '../../../doc/13_lifecycle.md?raw';
import text14 from '../../../doc/14_select.md?raw';
import text15 from '../../../doc/15_plugins.md?raw';
import text16 from '../../../doc/16_happy.md?raw';

export const parts = [
  {
    title: 'Introduction',
    slug: 'introduction',
    content: `# Introduction\n\n${text1}`,
  },
  {
    title: 'Installation',
    slug: 'installation',
    content: text2,
  },
  {
    title: 'Getting started',
    slug: 'getting-started',
    content: text3,
    children: [
      {
        title: 'Component options',
        slug: 'component-options',
        content: text4,
      },
      {
        title: 'Setup function',
        slug: 'setup-function',
        content: text5,
      },
      {
        title: 'Templating',
        slug: 'templating',
        content: text6,
      },
      {
        title: 'State & Props',
        slug: 'state-and-props',
        content: text7,
      },
      {
        title: 'Effects',
        slug: 'effects',
        content: text8,
      },
      {
        title: 'Computed',
        slug: 'computed',
        content: text9,
      },
      {
        title: 'Custom events',
        slug: 'custom-events',
        content: text10,
      },
      {
        title: 'Event delegation',
        slug: 'event-delegation',
        content: text11,
      },
      {
        title: 'Slots',
        slug: 'slots',
        content: text12,
      },
      {
        title: 'Lifecycle',
        slug: 'lifecycle',
        content: text13,
      },
      {
        title: 'Select',
        slug: 'select',
        content: text14,
      },
    ],
  },
  {
    title: 'Plugins',
    slug: 'plugins',
    content: text15,
  },
  {
    title: 'Happy',
    slug: 'happy',
    content: text16,
  },
  {
    title: '',
    slug: 'license',
    content: `
      
      <div class="text-center">
        build with 💖 by <a class="font-bold" href="https://github.com/petitssoldats" target="_blank">petitssoldats</a> with <a class="font-bold" href="https://github.com/petit-kit/scoped" target="_blank">@petit-kit/scoped@${SCOPE_VERSION}</a>
      </div>
      <br />
      <br />
      <br />
    `,
  },
];

export default parts;
