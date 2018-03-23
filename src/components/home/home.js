import React, { Component } from 'react'
import BlogPosts from '../blogPosts/blogPosts'
import RepoList from '../repoList/repoList'
import Paper from 'material-ui/Paper'
import { homePageStyles } from '../../utils/accessibility'

class Home extends Component {
  render() {
    return (
      <Paper style={homePageStyles.paper} zDepth={2}>
          <BlogPosts
            totalCount={this.props.blogPosts.totalCount}
            pathContext={this.props.blogPosts.pathContext}
          />
        </Paper>
    )
  }
}

export default Home
