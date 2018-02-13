const dotenv = require(`dotenv`);
dotenv.config();
module.exports = {
  siteMetadata: {
    title: `ERS Technology Office`
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
        query ($author: String="") {

          organization(login: $author) {
            description
            websiteUrl
            avatarUrl
            name
            repositories(first: 100, orderBy: {field: STARGAZERS , direction:DESC}) {
              totalCount
              edges {
                node {
                  name
                  descriptionHTML
                  stargazers(first: 50){
                    totalCount
                  }
                  forkCount
                  isFork
                  createdAt
                  updatedAt
                  homepageUrl
                  primaryLanguage {
                    name
                    color
                  }
                  collaborators(first: 50,affiliation: DIRECT) {
                    edges {
                      node {
                        name
                        login
                      }
                    }
                  }
                }
              }
            }
          }
        }        
        `,
        variables: {
          author: "ERS-HCL"
        }
      }
    }
  ]
};
