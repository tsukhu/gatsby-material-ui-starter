import 'babel-polyfill'
import React from 'react'
import RepoList from '../components/repoList/repoList'

export default ({ data }) => {
  return (
    <RepoList githubData={data.allGithubData} buildTime={data.site.buildTime} />
  )
}

export const query = graphql`
  query GithubQuery {
    site {
      buildTime
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
                    licenseInfo {
                      name
                    }
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
          }
        }
      }
    }
  }
`
