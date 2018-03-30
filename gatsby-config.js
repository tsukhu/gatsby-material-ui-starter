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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Roboto`
        ]
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-transformer-excel`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "HCL ERS Static Site",
        short_name: "ERS Open Source",
        description: "ERS Open Source",
        start_url: "/",
        background_color: "#f7f0eb",
        theme_color: "#a2466c",
        display: "minimal-ui",
        icons: [
          {
            src: "/logos/logo-192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/logos/logo-512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    },
    `gatsby-plugin-offline`,
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
