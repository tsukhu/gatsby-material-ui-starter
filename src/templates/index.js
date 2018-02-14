import React from 'react';
import BlogPosts from '../components/blogPosts/blogPosts';
import RepoList from '../components/repoList/repoList';

export default ({ data, pathContext }) => {
  return (
    <div>
      <BlogPosts totalCount={data.allMarkdownRemark.totalCount} pathContext={pathContext} />
      <hr />
      <RepoList githubData={data.allGithubData} />
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
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
                    forkCount
                    isFork
                    createdAt
                    updatedAt
                    pushedAt
                    homepageUrl
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
`;
