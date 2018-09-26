import React from 'react'
import { graphql } from 'gatsby'
import RepoList from '../components/repoList/repoList'
import Layout from '../components/layout'

export default ({ data }) => {
  return (
    <Layout>
      <RepoList
        githubData={data.allGithubData}
        buildTime={data.site.buildTime}
      />
    </Layout>
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
