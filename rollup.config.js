import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

/** Must run first so terser can eliminate dead code based on replaced values */
const replaceProd = replace({
  'process.env.NODE_ENV': JSON.stringify('production'),
  preventAssignment: true,
});

export default [
  // ESM (tree-shakeable)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      replaceProd,
      resolve(),
      typescript({ tsconfig: './tsconfig.rollup.json' }),
      terser({
        ecma: 2020,
        compress: {
          arrows: true,
          booleans: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
          if_return: true,
          inline: true,
          loops: true,
          negate_iife: true,
          passes: 2,
          properties: true,
          pure_funcs: ['console.info', 'console.debug'],
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unsafe: false,
          unsafe_arrows: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_symbols: false,
          unsafe_methods: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          unused: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
        sourceMap: false,
        toplevel: true,
      }),
    ],
  },
  // CJS (for Node.js compatibility)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      replaceProd,
      resolve(),
      typescript({ tsconfig: './tsconfig.rollup.json' }),
      terser({
        ecma: 2020,
        compress: {
          arrows: true,
          booleans: true,
          collapse_vars: true,
          comparisons: true,
          computed_props: true,
          dead_code: true,
          drop_console: true,
          drop_debugger: true,
          evaluate: true,
          hoist_funs: true,
          hoist_props: true,
          hoist_vars: false,
          if_return: true,
          inline: true,
          loops: true,
          negate_iife: true,
          passes: 2,
          properties: true,
          pure_funcs: ['console.info', 'console.debug'],
          reduce_funcs: true,
          reduce_vars: true,
          sequences: true,
          switches: true,
          toplevel: true,
          typeofs: true,
          unsafe: false,
          unsafe_arrows: false,
          unsafe_comps: false,
          unsafe_Function: false,
          unsafe_math: false,
          unsafe_symbols: false,
          unsafe_methods: false,
          unsafe_proto: false,
          unsafe_regexp: false,
          unsafe_undefined: false,
          unused: true,
        },
        mangle: {
          toplevel: true,
          properties: {
            regex: /^_/,
          },
        },
        format: {
          comments: false,
        },
        sourceMap: false,
        toplevel: true,
      }),
    ],
  },
];
