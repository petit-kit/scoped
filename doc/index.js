import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const OUTPUT_FILE = join(import.meta.dirname, '../README.md');

const content = [
  '1_logo.md',
  '1_preambule.md',
  '1_intro.md',
  '1_table.md',
  '2_installation.md',
  '3_getting_started.md',
  '4_component_options.md',
  '5_setup_function.md',
  '6_templating.md',
  '7_state_props.md',
  '8_effects.md',
  '9_computed.md',
  '10_custom_events.md',
  '11_event_delegation.md',
  '12_slots.md',
  '13_lifecycle.md',
  '14_select.md',
  '15_plugins.md',
  '16_happy.md',
].map((file) => {
  return join(import.meta.dirname, file);
});

const parts = content.map((file) => {
  const content = readFileSync(file, 'utf8');
  return {
    title: file.split('_')[0],
    content,
  };
});

const newReadme = parts.reduce((acc, item) => {
  acc += `${item.content}\n\n`;
  return acc;
}, '');

writeFileSync(OUTPUT_FILE, newReadme);
