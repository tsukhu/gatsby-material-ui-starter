import React from 'react';
import styles from './repoList.module.css';
import ReactTable from 'react-table';
import BlockContainer from '../blockContainer/blockContainer';
import 'react-table/react-table.css';

const moment = require('moment-timezone');
moment.tz.setDefault('UTC');

const Project = props => (
  <div className={styles.project}>
  <h5 className={styles.name}><a href={props.url} target="_blank" >{props.name}</a></h5>
    <div className={styles.description}>
      <p className={styles.excerpt}>
        <div dangerouslySetInnerHTML={{ __html: props.excerpt }} />
      </p>
    </div>
  </div>
);

class RepoList extends React.Component {
  render() {
    const columns = [
      {
        Header: 'Repository',
        accessor: 'name' //d => d.name
      },
      {
        Header: 'Authors',
        accessor: 'contributors' // String-based value accessors!
      },
      {
        id: 'LanguageName',
        Header: 'Language',
        maxWidth: 120,
        accessor: d => d.language.name // Custom value accessors!
      },
      {
        Header: 'Stars',
        accessor: 'stars',
        maxWidth: 80,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Forks',
        accessor: 'forkCount',
        maxWidth: 80,
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: 'Last Push',
        maxWidth: 120,
        accessor: 'pushedAt' // String-based value accessors!
      }
    ];
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
        language: getPrimaryLanguage(repo.node.primaryLanguage),
        pushedAt: moment(repo.node.pushedAt).format('Do MMM YYYY'),
        descriptionHTML: repo.node.descriptionHTML,
        homepageUrl: repo.node.homepageUrl,
        url: repo.node.url
      };
    });

    return (
      <div>
        <h4>
          {repositories.totalCount} Repositories as on{' '}
          {moment().format('Do MMM YYYY HH:MM A z')}
        </h4>
        <ReactTable
          data={reposdata}
          columns={columns}
          defaultPageSize={20}
          SubComponent={row => {
            console.log(row);
            return (
              <BlockContainer>
                <Project
                  name={row.original.name}
                  url={row.original.url}
                  avatar=""
                  excerpt={row.original.descriptionHTML}
                />
              </BlockContainer>
            );
          }}
        />
      </div>
    );
  }
}

export default RepoList;
