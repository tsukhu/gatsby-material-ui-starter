import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import BlogPosts from '../blogPosts/blogPosts'
import RepoList from '../repoList/repoList'
import Paper from 'material-ui/Paper'
import blueGrey from 'material-ui/colors/blueGrey'


const styles = theme => ({
  paper: {
    display: 'flex',
    transitionEnabled: true,
    backgroundColor: blueGrey[50],
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 5
  }
})
class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.paper} elevation={2}>
          <BlogPosts
            totalCount={this.props.blogPosts.totalCount}
            pathContext={this.props.blogPosts.pathContext}
          />
        </Paper>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Home)
