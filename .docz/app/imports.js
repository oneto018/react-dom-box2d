export const imports = {
  'docs/Getting_Started.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-getting-started" */ 'docs/Getting_Started.mdx'
    ),
  'docs/Gravity.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-gravity" */ 'docs/Gravity.mdx'
    ),
  'docs/Item.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-item" */ 'docs/Item.mdx'
    ),
  'docs/World.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "docs-world" */ 'docs/World.mdx'
    ),
}
