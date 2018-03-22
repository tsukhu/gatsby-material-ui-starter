import React, { Component } from 'react'
import BlogPosts from '../blogPosts/blogPosts'
import RepoList from '../repoList/repoList'
import Paper from 'material-ui/Paper'

const styles = {
  root: {
    display: 'flex',
    alignContent: 'center',
  },
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    width: '100%',
    transitionEnabled: true,
    backgroundColor: '#F2F6F7',
    alignContent: 'center',
    alignItems: 'center'
  }
}
class Home extends Component {
  render() {
    return (
      <div style={styles.root}>
        <Paper style={styles.paper} zDepth={1}>
          <BlogPosts
            totalCount={this.props.blogPosts.totalCount}
            pathContext={this.props.blogPosts.pathContext}
          />
        </Paper>
      </div>
    )
  }
}

export default Home
