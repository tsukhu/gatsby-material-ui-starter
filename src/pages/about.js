import React from 'react';
// import styles from './about.module.css';
import AboutCard from '../components/aboutCard/aboutCard';

export default ({ data }) => {
  const org = data.allGithubData.edges[0].node.data.organization;
  const orgData = {
    description: org.description,
    websiteUrl: org.websiteUrl,
    avatarUrl: org.avatarUrl,
    name: org.name,
    maintainedBy: data.site.siteMetadata.maintainedBy,
    poweredBy: data.site.siteMetadata.poweredBy,
    githubProject: data.site.siteMetadata.githubProject
  };
  return (
    <div>
      <AboutCard data={orgData} />
      </div>
  );
};

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        maintainedBy
        poweredBy
        githubProject
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
              name
            }
          }
        }
      }
    }
  }
`;
