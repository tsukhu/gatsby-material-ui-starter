import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ReactTable from 'react-table'
import BlockContainer from '../blockContainer/blockContainer'
import 'react-table/react-table.css'
import ProjectCard from '../projectCard/projectCard'
import PageHeader from '../pageHeader/pageHeader'
import Paper from '@material-ui/core/Paper'
import blueGrey from '@material-ui/core/colors/blueGrey'
import { CSVLink } from 'react-csv'
import Typography from '@material-ui/core/Typography'
import FileDownload from '@material-ui/icons/FileDownload'
import IconButton from '@material-ui/core/IconButton'
import IconDashboard from '@material-ui/icons/Dashboard'
import Tooltip from '@material-ui/core/Tooltip'

const moment = require('moment-timezone')
moment.tz.setDefault('UTC')

const styles = theme => ({
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    rounded: true,
    borderRadius: 5,
    shadowRadius: 5
  },
  csv: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignSelf: 'flex-start'
  },
  button: {
    margin: theme.spacing.unit,
    fontSize: '.85em'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
})

class RepoList extends React.Component {
  render() {
    const { classes } = this.props
    const buildTime = this.props.buildTime
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
        maxWidth: 170,
        accessor: d => d.language.name, // Custom value accessors!
        Cell: row => {
          return (
            <span>
              <span
                style={{
                  color: row.original.language.color,
                  transition: 'all .3s ease'
                }}
              >
                &#x25cf;
              </span>{' '}
              {row.original.language.name}
            </span>
          )
        }
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
        Header: 'Created On',
        maxWidth: 120,
        accessor: 'createdAt', // String-based value accessors!
        Cell: props => <span>{moment.utc(props.value).from(buildTime)}</span>
      },
      {
        Header: 'Last Push',
        maxWidth: 120,
        accessor: 'pushedAt', // String-based value accessors!
        Cell: props => <span>{moment.utc(props.value).from(buildTime)}</span>
      }
    ]
    const org = this.props.githubData.edges[0].node.data.organization
    const orgData = {
      description: org.description,
      websiteUrl: org.websiteUrl
    }
    const repositories = org.repositories
    const getTopics = edges => {
      return edges.map(edge => {
        return edge.node.topic.name
      })
    }
    const getContributors = contributors => {
      return contributors
        .map(edge => {
          return edge.node.name && edge.node.name.trim() !== ''
            ? edge.node.name
            : edge.node.login
        })
        .join(',')
    }
    const getPrimaryLanguage = primaryLanguage => {
      return primaryLanguage
        ? {
            name: primaryLanguage.name,
            color: primaryLanguage.color
          }
        : {
            name: 'na',
            color: 'black'
          }
    }

    const reposdata = repositories.edges.map(repo => {
      return {
        name: repo.node.name,
        forkCount: repo.node.forkCount,
        stars: repo.node.stargazers.totalCount,
        contributors: getContributors(repo.node.collaborators.edges),
        language: getPrimaryLanguage(repo.node.primaryLanguage),
        pushedAt: repo.node.pushedAt,
        createdAt: repo.node.createdAt,
        descriptionHTML: repo.node.descriptionHTML,
        homepageUrl: repo.node.homepageUrl,
        url: repo.node.url,
        topics: getTopics(repo.node.repositoryTopics.edges),
        license: repo.node.licenseInfo ? repo.node.licenseInfo.name : null
      }
    })
    const pageHeader =
      +repositories.totalCount +
      ' Repositories as on ' +
      moment(this.props.buildTime).format('Do MMM YYYY HH:MM A z')
    const csvFileName =
      'ProjectList_' + moment(new Date()).format('DD_MM_YYYY') + '.csv'
    return (
      <Paper className={classes.paper} elevation={2}>
        <PageHeader text={pageHeader} />
        {/*         <Typography variant="caption">
          <a href="#">Full List</a>
        </Typography> */}
        <Typography variant="button" gutterBottom>
          <Button
            variant="extendedFab"
            color="secondary"
            aria-label="fulllist"
            href="https://affectionate-keller-d4f61b.netlify.com/"
            target="_blank"
            className={classes.button}
          >
            <IconDashboard className={classes.extendedIcon} />
            Detailed View
          </Button>
        </Typography>
        <div className={classes.csv}>
          <Tooltip title="Download CSV">
            <CSVLink data={reposdata} filename={csvFileName}>
              <IconButton aria-label="Download">
                <FileDownload />
              </IconButton>
            </CSVLink>
          </Tooltip>
        </div>
        <ReactTable
          getProps={(state, rowInfo, column) => {
            return {
              style: {
                backgroundColor: 'white',
                fontFamily: 'Roboto, sans-serif'
              }
            }
          }}
          getTheadThProps={(state, rowInfo, column) => {
            return {
              style: {
                fontWeight: 'bold'
              }
            }
          }}
          data={reposdata}
          className="-striped -highlight"
          columns={columns}
          defaultPageSize={20}
          SubComponent={row => {
            return (
              <BlockContainer>
                <ProjectCard
                  name={row.original.name}
                  url={row.original.url}
                  avatar=""
                  excerpt={row.original.descriptionHTML}
                  topics={row.original.topics}
                  language={row.original.language}
                  license={row.original.license}
                />
              </BlockContainer>
            )
          }}
        />
      </Paper>
    )
  }
}

RepoList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(RepoList)
