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
        <table className={styles.table}>
          <tr className={styles.table}>
            <th className={styles.th}>Repository</th>
            <th className={styles.th}>Authors</th>
            <th className={styles.th}>Language</th>
            <th className={styles.th}>Fork Count</th>
            <th className={styles.th}>Stars</th>
          </tr>
          {reposdata.map(repo => (
            <tr>
              <td className={styles.td} key={repo.name}>{repo.name}</td>
              <td className={styles.td} key={repo.contributors}>{repo.contributors}</td>
              <td className={styles.td} key={repo.language.name}>{repo.language.name}</td>              
              <td className={styles.td} key={repo.forkCount}>{repo.forkCount}</td>
              <td className={styles.td} key={repo.stars}>{repo.stars}</td>

            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default RepoList;
