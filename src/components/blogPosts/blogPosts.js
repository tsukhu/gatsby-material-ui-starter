import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import PostPagination from './postPagination/postPagination'
import PageHeader from '../pageHeader/pageHeader'
import SimpleCard from '../simpleCard/simpleCard'
import Layout from '../layout'

const styles = theme => ({
  card: {
    alignSelf: 'auto',
    flex: '1 1 auto',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    theme: 'inherit',
    margin: 5,
    alignContent: 'center'
  }
})

export class BlogPosts extends Component {
  render() {
    const { classes } = this.props
    const { group, index, pageCount } = this.props.pageContext
    const previousUrl = index - 1 === 1 ? '' : (index - 1).toString()
    const nextUrl = (index + 1).toString()
    const isFirstPage = index - 1 === 0
    const isLastPage = index === pageCount
    const pageHeader = 'Announcements and Posts (' + this.props.totalCount + ')'
    return (
      <Layout>
        <div className={classes.card}>
          <PageHeader text={pageHeader.toUpperCase()} />
          {group.map(({ node }) => (
            <div key={node.id}>
              <SimpleCard
                date={node.frontmatter.date}
                excerpt={node.excerpt}
                title={node.frontmatter.title}
                url={node.fields.slug}
              />
            </div>
          ))}
          <PostPagination
            index={index}
            pageCount={pageCount}
            isFirstPage={isFirstPage}
            isLastPage={isLastPage}
            nextUrl={nextUrl}
            previousUrl={previousUrl}
          />
        </div>
      </Layout>
    )
  }
}

BlogPosts.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(BlogPosts)
