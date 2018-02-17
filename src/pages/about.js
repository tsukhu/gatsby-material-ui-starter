import React from 'react';
import styles from './about.module.css';

const About = props => (
  <div className={styles.user}>
    <img src={props.data.avatarUrl} className={styles.avatar} alt="" />
    <div className={styles.description}>
      <h2 className={styles.username}>{props.data.name}</h2>
      <p className={styles.username}>{props.data.maintainedBy}</p>
      <p className={styles.username}>Powered By: {props.data.poweredBy}</p>
      <p className={styles.username}>
        <a href={props.data.githubProject} target="_blank">Github repo</a>
      </p>
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
    name: org.name,
    maintainedBy: data.site.siteMetadata.maintainedBy,
    poweredBy: data.site.siteMetadata.poweredBy,
    githubProject: data.site.siteMetadata.githubProject
  };
  return (
    <div>
      <h4 className={styles.About}>About {data.site.siteMetadata.title}</h4>
      <About data={orgData} />
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
