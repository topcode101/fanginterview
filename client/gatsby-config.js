
const { getThemeVariables } = require('antd/dist/theme');
const x = getThemeVariables({
  compact: true
})
// todo: this is not working, getThemeVariables is to
// change react theme. 
// maybe remove these code 

console.log(JSON.stringify(x, null, 4))
module.exports = {
  proxy: [
    {
      prefix: '/api',
      url: 'http://localhost:10010'
    },
    {
      prefix: '/download',
      url: 'http://localhost:10010'
    }
  ],
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-antd',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/../posts/`
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Simplefolio`,
        short_name: `Simplefolio`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#02aab0`,
        display: `standalone`,
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-less`,
      options: {
        lessOptions : {
          modifyVars: getThemeVariables({
            compact: true
          }),
          javascriptEnabled: true,
        },
        javascriptEnabled: true,
        modifyVars: {
          'primary-color': '#BADA55'
        }
      }
    },
    {
      resolve: 'gatsby-plugin-antd',
      options: {
        style: true
      }
    },
    `gatsby-transformer-remark`,
  ],
};
