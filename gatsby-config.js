require('dotenv').config()
module.exports = {
  siteMetadata: {
    title: `Gatsby Starter`,
    maintainedBy: `Gatsby Starter Project with Material-UI`,
    poweredBy: `GatsbyJS`,
    contributors: `Tarun Sukhu<tsukhu@hcl.com>`,
    githubProject: `https://github.com/ERS-HCL/gatsby-poc`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Roboto:300,400,500`,`Nunito`]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'HCL ERS Static Site',
        short_name: 'ERS OSS',
        description: 'ERS Open Source',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#a2466c',
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/logos/logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-119197833-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: []
      }
    } /* , {
      resolve: `gatsby-plugin-guess-js`,
      options: {
        GAViewID: `175275642`,
        minimumThreshold: 0.03,
        period: {
          startDate: new Date("2018-2-1"),
          endDate: new Date("2019-5-5")
        }
      }
    } */,
/*     {
      resolve: 'gatsby-source-apiserver',
      options: {
        name: 'people',
        method: 'get',
        url: 'https://swapi.co/api/people/',
        auth: false,
        entityLevel: 'results',
        typePrefix: '', // must be empty string so it’s not “undefinedPeople”
      },
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        name: 'breeds',
        method: 'get',
        url: 'https://dog.ceo/api/breeds/list/all',
        auth: false,
        entityLevel: 'message',
        typePrefix: '', // must be empty string so it’s not “undefinedPeople”
      },
    }, */
    `gatsby-plugin-offline`
  ]
}
