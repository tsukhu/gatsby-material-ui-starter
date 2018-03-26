const dotenv = require(`dotenv`);
dotenv.config();
module.exports = {
  siteMetadata: {
    title: `Open Source @HCL-ERS`,
    maintainedBy: `Maintained by ERS Technology Office`,
    poweredBy: `GatsbyJS`,
    githubProject: `https://github.com/ERS-HCL/gatsby-demo-app`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-excel`,
    `gatsby-transformer-remark`,
    {
      resolve: 'gatsby-plugin-material-ui',
      options: {
        pathToTheme: 'src/utils/typography',
      },
    },
    {
      resolve: `gatsby-source-github-api`,
      options: {
        token: `${process.env.GITHUB_TOKEN}`,
        variables: {},
        graphQLQuery: `
        query ($author: String="") {
          all: search(query: "stars:>50000", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
          typescript: search(query: "stars:>3000 language:TypeScript", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
          css: search(query: "stars:>3000 language:CSS", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
          html: search(query: "stars:>3000 language:HTML", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
          javascript: search(query: "stars:>3000 language:JavaScript", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }
          java: search(query: "stars:>3000 language:Java", type: REPOSITORY, first: 10) {
            repositoryCount
            edges {
              node {
                ... on Repository {
                  name
                  owner {
                    login
                    avatarUrl
                  }
                  url
                  description
                  descriptionHTML
                  primaryLanguage {
                    name
                    color
                  }
                  stargazers {
                    totalCount
                  }
                }
              }
            }
          }                
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
                  license
                  stargazers(first: 50){
                    totalCount
                  }
                  repositoryTopics(first:20){
                    edges{
                      node{
                        topic {
                          name
                        }
                      }
                    }
                  }
                  forkCount
                  isFork
                  createdAt
                  updatedAt
                  pushedAt
                  homepageUrl
                  url
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
