export const imports = {
  'docs/Getting_Started.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "docs-getting-started" */ 'docs/Getting_Started.mdx'),
}
