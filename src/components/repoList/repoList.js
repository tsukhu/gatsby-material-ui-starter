import React from 'react';
import styles from './repoList.module.css';

class RepoList extends React.Component {
  render() {
    const org = this.props.githubData.edges[0].node.data.organization;
    const orgData = {
      description: org.description,
      websiteUrl: org.websiteUrl
    };
    const repositories = org.repositories;
    const getContributors = contributors => {
      return contributors
        .map(edge => {
          return edge.node.name && edge.node.name.trim() !== ''
            ? edge.node.name
            : edge.node.login;
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
        <h3>Repository count : {repositories.totalCount} </h3>
        <table className={styles.table}>
          <tr className={styles.table}>
            <th className={styles.th}>Repository</th>
            <th className={styles.th}>Authors</th>
            <th className={styles.th}>Language</th>
            <th className={styles.th}>Stars</th>
            <th className={styles.th}>Fork Count</th>
          </tr>
          {reposdata.map(repo => (
            <tr key={repo.name}>
              <td className={styles.td} >{repo.name}</td>
              <td className={styles.td} >{repo.contributors}</td>
              <td className={styles.td} >{repo.language.name}</td>              
              <td className={styles.td} >{repo.stars}</td>
              <td className={styles.td} >{repo.forkCount}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default RepoList;