import type { ComponentPlugin, ComponentContextBase } from '../../index';

export type LocalStoragePluginOptions = {
  /** Key prefix for namespacing. Default: empty. */
  prefix?: string;
  /** Use JSON parse/stringify for values. Default: true. */
  json?: boolean;
};

/**
 * LocalStorage plugin controls. Provides a scoped localStorage API with optional
 * key prefixing and JSON serialization.
 *
 * @example
 * ```ts
 * define("my-settings", { plugins: [localStoragePlugin()] }, ({ storage }) => {
 *   const theme = storage.get("theme") ?? "dark";
 *   actions.setTheme = (t) => {
 *     storage.set("theme", t);
 *     state.theme = t;
 *   };
 *   return () => `...`;
 * });
 * ```
 */
export type LocalStorageControls = {
  /** Get a value by key. Returns undefined if not found or on parse error. */
  get: <T = unknown>(key: string) => T | undefined;
  /** Set a value. Values are JSON-serialized when json option is true. */
  set: (key: string, value: unknown) => void;
  /** Remove a key. */
  remove: (key: string) => void;
  /** Clear all keys with this plugin's prefix. */
  clear: () => void;
};

function prefixKey(prefix: string, key: string): string {
  return prefix ? `${prefix}:${key}` : key;
}

/**
 * LocalStorage plugin – scoped localStorage with optional prefix and JSON serialization.
 *
 * Use a key prefix to namespace values per component or app. Values are automatically
 * JSON-serialized/parsed when the json option is true (default). Safe when window
 * is undefined (SSR); methods no-op.
 *
 * @example
 * ```ts
 * define("c-settings", { plugins: [localStoragePlugin({ prefix: "app" })] }, ({ storage }) => {
 *   state.theme = storage.get("theme") ?? "dark";
 *   actions.toggleTheme = () => {
 *     const next = state.theme === "dark" ? "light" : "dark";
 *     storage.set("theme", next);
 *     state.theme = next;
 *   };
 *   return () => `<div class="{theme}">...</div>`;
 * });
 * ```
 */
export const localStoragePlugin = (
  options: LocalStoragePluginOptions = {}
): ComponentPlugin<{ storage: LocalStorageControls }> => ({
  name: 'localstorage',
  extend: (_context: ComponentContextBase) => {
    const { prefix = '', json = true } = options;
    const storage = typeof window === 'undefined' ? null : window.localStorage;

    const get: LocalStorageControls['get'] = <T = unknown>(
      key: string
    ): T | undefined => {
      if (!storage) return undefined;
      try {
        const raw = storage.getItem(prefixKey(prefix, key));
        if (raw === null) return undefined;
        return json ? (JSON.parse(raw) as T) : (raw as unknown as T);
      } catch {
        return undefined;
      }
    };

    const set: LocalStorageControls['set'] = (
      key: string,
      value: unknown
    ): void => {
      if (!storage) return;
      try {
        const serialized = json ? JSON.stringify(value) : String(value);
        storage.setItem(prefixKey(prefix, key), serialized);
      } catch {
        // QuotaExceededError or other write errors – silently no-op
      }
    };

    const remove: LocalStorageControls['remove'] = (key: string): void => {
      if (!storage) return;
      storage.removeItem(prefixKey(prefix, key));
    };

    const clear: LocalStorageControls['clear'] = (): void => {
      if (!storage) return;
      if (!prefix) return; // Without prefix, we cannot safely clear (would affect all keys)
      const keys: string[] = [];
      for (let i = 0; i < storage.length; i++) {
        const k = storage.key(i);
        if (k != null && k.startsWith(prefix + ':')) keys.push(k);
      }
      for (const k of keys) storage.removeItem(k);
    };

    return { storage: { get, set, remove, clear } };
  },
});
