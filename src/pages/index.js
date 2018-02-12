import React from 'react';
import g from 'glamorous';
import BlogPosts from '../components/blogPosts/blogPosts';
import RepoList from '../components/repoList/repoList';

export default ({ data }) => {
  return (
    <div>
      <g.H2 display={'inline-block'} borderBottom={'1px solid'}>
        Announcements and Posts
      </g.H2>
      <BlogPosts markDown={data.allMarkdownRemark} />
      <hr/>
      <RepoList githubData={data.allGithubData}/>

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
