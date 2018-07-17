import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BlogPosts from '../blogPosts/blogPosts'
import RepoList from '../repoList/repoList'
import Paper from '@material-ui/core/Paper'
import blueGrey from '@material-ui/core/colors/blueGrey'

const styles = theme => ({
  paper: {
    display: 'flex',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 5,
    margin: 5
  }
})
class Home extends Component {
  state = {
    loaded: true
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      loaded: true
    })
  }
  render() {
    const { classes } = this.props
    return this.state.loaded ? (
      <Paper className={classes.paper} elevation={2}>
        <BlogPosts
          totalCount={this.props.blogPosts.totalCount}
          pageContext={this.props.blogPosts.pageContext}
        />
      </Paper>
    ) : (
      <div />
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Home)
