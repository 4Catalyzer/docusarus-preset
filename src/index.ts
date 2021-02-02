import { handler, resolver } from 'react-docgen-styled-resolver';

/* eslint-disable global-require */
interface Options {
  debug?: boolean;
  theme?: false | Record<string, any>;
  docs?: false | Record<string, any>;
  pages?: false | Record<string, any>;
  sitemap?: false | Record<string, any>;
  reactMetadata?: Record<string, any>;
  resolveReact?: boolean;
  customCss?: string;
}

export default function preset(context: any, opts: Options = {}) {
  const { siteConfig = {} } = context;
  const { themeConfig } = siteConfig;
  const { algolia } = themeConfig;
  const isProd = process.env.NODE_ENV === 'production';

  const debug = opts.debug != null ? !!opts.debug : !isProd;

  return {
    themes: [
      opts.theme,
      require.resolve('docusaurus-theme-jarle-codeblock'),
      require.resolve('./theme-plugin'),
      algolia && require.resolve('@docusaurus/theme-search-algolia'),
    ],
    plugins: [
      opts.resolveReact !== false && require.resolve('./resolve-react'),
      opts.docs !== false && [
        require.resolve('@docusaurus/plugin-content-docs'),
        {
          ...opts.docs,
          remarkPlugins: [
            require('./parseCodeBlocks'),
            require('./fix-toc'),
            ...(opts.docs?.remarkPlugins || []),
          ],
        },
      ],
      opts.pages !== false && [
        require.resolve('@docusaurus/plugin-content-pages'),
        {
          ...opts.pages,
          remarkPlugins: [
            require('./parseCodeBlocks'),
            ...(opts.pages?.remarkPlugins || []),
          ],
        },
      ],
      debug && require.resolve('@docusaurus/plugin-debug'),
      isProd &&
        opts.sitemap !== false && [
          require.resolve('@docusaurus/plugin-sitemap'),
          opts.sitemap,
        ],
      [
        require.resolve('docusaurus-plugin-react-metadata'),
        {
          watchPaths: [],
          ...opts.reactMetadata,
          mdx: {
            ...opts.reactMetadata?.mdx,
            remarkPlugins: [
              require('./parseCodeBlocks'),
              ...(opts.reactMetadata?.mdx?.remarkPlugins || []),
            ],
          },
          docgen: {
            resolver,
            handlers: [handler],
            ...opts.reactMetadata?.docgen,
          },
        },
      ],
    ],
  };
}
