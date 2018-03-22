import React from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import GithubStats from '../components/githubStats/githubStats'

export default ({ data }) => {
  return (
    <GithubStats
      githubData={data.allGithubData}
      buildTime={data.site.buildTime}
    />
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
