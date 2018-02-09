import React from 'react';
import g from 'glamorous';
import Link from 'gatsby-link';

import { rhythm } from '../utils/typography';

export default ({ data }) => {
  const org = data.allGithubData.edges[0].node.data.organization;
  const orgData = {
    description: org.description,
    websiteUrl: org.websiteUrl
  };
  const repositories = org.repositories;
  const getContributors = contributors => {
    return contributors
      .map(edge => {
        console.log(edge.node.name, edge.node.login);
        return edge.node.name ? edge.node.name : edge.node.login;
      })
      .join(',');
  };
  const getPrimaryLanguage = primaryLanguage => {
    return primaryLanguage
      ? {
          name: primaryLanguage.name,
          color: primaryLanguage.color
        }
      : {
          name: 'na',
          color: 'black'
        };
  };

  const reposdata = repositories.edges.map(repo => {
    return {
      name: repo.node.name,
      forkCount: repo.node.forkCount,
      stars: repo.node.stargazers.totalCount,
      contributors: getContributors(repo.node.collaborators.edges),
      language: getPrimaryLanguage(repo.node.primaryLanguage)
    };
  });
  return (
    <div>
      <g.H1 display={'inline-block'} borderBottom={'1px solid'}>
        GitHub Projects
      </g.H1>
      <br />
      {orgData.description}
      <br />
      {orgData.websiteUrl}
      <ul>
        {reposdata.map(repo => (
          <li>
            {repo.name} , {repo.forkCount} , {repo.stars}, {repo.contributors} ,  {repo.language.name}
          </li>
        ))}
      </ul>
      {/* <h4>
        {data.allMarkdownRemark.totalCount} Posts
      </h4> */}
      {/* {data.allMarkdownRemark.edges.map(({ node }) =>
        <div key={node.id}>
          <Link
            to={node.fields.slug}
            css={{ textDecoration: `none`, color: `inherit` }}
          >

            <g.H3 marginBottom={rhythm(1 / 4)}>
              {node.frontmatter.title}{" "}
              <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
            </g.H3>
            <p>
              {node.excerpt}
            </p>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export const query = graphql`
  query IndexQuery {
    allGithubData {
      edges {
        node {
          data {
            organization {
              description
              websiteUrl
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
