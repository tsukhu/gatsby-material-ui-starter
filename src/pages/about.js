import React from 'react';
import styles from './about.module.css';

const About = props => (
  <div className={styles.user}>
    <img src={props.data.avatarUrl} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.data.name}</h2>
      <p className={styles.excerpt}>{props.data.description}</p>
    </div>
  </div>
);

export default ({ data }) => {
  const org = data.allGithubData.edges[0].node.data.organization;
  const orgData = {
    description: org.description,
    websiteUrl: org.websiteUrl,
    avatarUrl: org.avatarUrl,
    name: org.name
  };
  return (
    <div>
      <h1>About {data.site.siteMetadata.title}</h1>
      <About
        data={orgData}
        />
    </div>
  );
};

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
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
