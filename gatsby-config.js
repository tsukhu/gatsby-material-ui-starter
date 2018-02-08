const dotenv = require(`dotenv`);
dotenv.config();
module.exports = {
  siteMetadata: {
    title: `Pandas Eating Lots`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: `${process.env.GITHUB_TOKEN}`,
        variables: {},
        graphQLQuery: `
        query {
          viewer {
            name
             repositories(affiliations:ORGANIZATION_MEMBER last: 50) {
               nodes {
                 name
                description
               }
             }
           }
        }
        `
      }
    }
  ]
};
