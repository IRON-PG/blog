const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://iron-pg.github.io',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    // logo: 'https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/brand.svg',
    logoLink: '/',
    title:
      "IRON-PG",
    githubUrl: 'https://github.com/IRON-PG/blog',
    helpUrl: '',
    tweetText: '',
    // social: `<li>
		//     <a href="https://twitter.com/hasurahq" target="_blank" rel="noopener">
		//       <div class="twitterBtn">
		//         <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/twitter-brands-block.svg' alt={'Twitter'}/>
		//       </div>
		//     </a>
		//   </li>
		// 	<li>
		//     <a href="https://discordapp.com/invite/hasura" target="_blank" rel="noopener">
		//       <div class="discordBtn">
		//         <img src='https://graphql-engine-cdn.hasura.io/learn-hasura/assets/homepage/discord-brands-block.svg' alt={'Discord'}/>
		//       </div>
		//     </a>
		//   </li>`,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      '/introduction', // add trailing slash if enabled above
    ],
    collapsedNav: [
      '/GOODTSS',
      '/ORANGE',
      '/YUUIL'
    ],
    links: [{ text: 'IRON-PG', link: 'https://github.com/IRON-PG' }],
    frontLine: false,
    ignoreIndex: true,
    title:
      "Blog<div class='purpleCircle'></div>",
  },
  siteMetadata: {
    title: 'Blog | IRON-PG',
    description: 'IRON-PG Blog',
    ogImage: null,
    docsLocation: 'https://github.com/IRON-PG/blog/tree/master/content',
    favicon: 'https://graphql-engine-cdn.hasura.io/img/hasura_icon_black.svg',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'IRON-PG blog',
      short_name: 'IronPgBlog',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
