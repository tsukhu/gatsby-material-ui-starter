import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BlogPosts from '../blogPosts/blogPosts'
import Layout from '../layout'
import Paper from '@material-ui/core/Paper'
import homeStyle from '../../style/components/Home/homeStyle'

class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <Layout>
        <Paper className={classes.paper} elevation={2}>
          <BlogPosts
            totalCount={this.props.blogPosts.totalCount}
            pageContext={this.props.blogPosts.pageContext}
          />
        </Paper>
      </Layout>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(homeStyle, { withTheme: true })(Home)
