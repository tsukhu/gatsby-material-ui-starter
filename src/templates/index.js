import React from 'react'
import Home from '../components/home/home'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'

export default ({ data, pathContext }) => {
  const content = {
    blogPosts: {
      totalCount: data.allMarkdownRemark.totalCount,
      pathContext: pathContext
    },
    githubData: data.allGithubData,
    buildTime: data.site.buildTime
  }
  return (
    <div>
      <Route
        path="/"
        render={routeProps => <Home {...routeProps} {...content} />}
      />
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    site {
      buildTime
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
    allGithubData {
      edges {
        node {
          data {
            organization {
              description
              websiteUrl
              avatarUrl
              repositories {
                totalCount
                edges {
                  node {
                    name
                    descriptionHTML
                    license
                    forkCount
                    isFork
                    createdAt
                    updatedAt
                    pushedAt
                    homepageUrl
                    url
                    repositoryTopics {
                      edges {
                        node {
                          topic {
                            name
                          }
                        }
                      }
                    }
                    collaborators {
                      edges {
                        node {
                          name
                          login
                        }
                      }
                    }
                    stargazers {
                      totalCount
                    }
                    isFork
                    primaryLanguage {
                      name
                      color
                    }
                    homepageUrl
                  }
                }
              }
            }
            all {
              repositoryCount
              edges {
                node {
                  url
                  description
                  descriptionHTML
                  owner {
                    login
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
                  description
                  descriptionHTML
                  owner {
                    login
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
                  description
                  descriptionHTML
                  owner {
                    login
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
                  description
                  descriptionHTML
                  owner {
                    login
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
                  description
                  descriptionHTML
                  owner {
                    login
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
                  description
                  descriptionHTML
                  owner {
                    login
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
