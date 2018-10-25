import React from 'react'
import { graphql } from 'gatsby'
import GithubStats from '../components/githubStats/githubStats'
import Layout from '../components/layout'

export default ({ data }) => {
  return (
    <Layout>
      <GithubStats
        githubData={data.allGithubData}
        buildTime={data.site.buildTime}
      />
    </Layout>
  )
}

export const query = graphql`
  query GithubStatsQuery {
    site {
      buildTime
    }
    allGithubData {
      edges {
        node {
          data {
            all {
              repositoryCount
              edges {
                node {
                  name
                  url
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
            java {
              repositoryCount
              edges {
                node {
                  url
                  name
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
            html {
              repositoryCount
              edges {
                node {
                  url
                  name
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
            css {
              repositoryCount
              edges {
                node {
                  url
                  name
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
            javascript {
              repositoryCount
              edges {
                node {
                  url
                  name
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
            typescript {
              repositoryCount
              edges {
                node {
                  url
                  name
                  description
                  descriptionHTML
                  owner {
                    login
                    avatarUrl
                  }
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
        }
      }
    }
  }
`
