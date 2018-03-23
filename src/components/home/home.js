import React, { Component } from 'react'
import BlogPosts from '../blogPosts/blogPosts'
import RepoList from '../repoList/repoList'
import Paper from 'material-ui/Paper'

const styles = {
  paper: {
    margin: 5,
    padding: 10,
    display: 'block',
    height: '100%',
    minHeight: '100vh',
    transitionEnabled: true,
    backgroundColor: '#F2F6F7',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    shadowRadius: 5
  }
}
class Home extends Component {
  render() {
    return (
      <Paper style={styles.paper} zDepth={2}>
          <BlogPosts
            totalCount={this.props.blogPosts.totalCount}
            pathContext={this.props.blogPosts.pathContext}
          />
        </Paper>
    )
  }
}

export default Home
