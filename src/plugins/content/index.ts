// import type { ComponentPlugin, ComponentContextBase } from '../../index';
// import { w, setLang, getLang } from '@/content';

// export type ContentControls = {
//   w: (key: string) => any;
//   setLang: (lang: string) => void;
//   getLang: () => string;
//   onLangChange: (
//     handler: (lang: string, event: CustomEvent<string>) => void,
//     options?: { immediate?: boolean }
//   ) => () => void;
// };

// export type ContentPluginOptions = {
//   forceRender?: boolean;
// };

// export const contentPlugin = (
//   options: ContentPluginOptions = {}
// ): ComponentPlugin<ContentControls> => ({
//   name: 'contentPlugin',
//   extend: (context: ComponentContextBase, host) => {
//     const onLangChange: ContentControls['onLangChange'] = (
//       handler,
//       options = {}
//     ) => {
//       if (typeof window === 'undefined') return () => {};
//       const { immediate = false } = options;
//       const cleanup = context.listen(window, 'app-lang-changed', (event) => {
//         handler(event.detail, event);
//       });
//       if (immediate) {
//         handler(getLang(), new CustomEvent('app-lang-changed'));
//       }
//       return cleanup;
//     };

//     const { forceRender = true } = options;
//     if (forceRender && typeof window !== 'undefined') {
//       context.listen(window, 'app-lang-changed', () => {
//         host.forceRender();
//       });
//     }

//     return { w, setLang, getLang, onLangChange };
//   },
// });
