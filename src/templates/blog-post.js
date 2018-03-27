import React from 'react'
import Paper from 'material-ui/Paper'
import ReactHtmlParser from 'react-html-parser';
import Card, { CardActions, CardHeader, CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  divStyle: {
    fontFamily: 'Roboto, sans-serif'
  },
  card: {
    width: '100%',
    margin: 5,
    minHeight: '100vh',
    alignContent: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    shadowRadius: 5,
    border: '1px grey',
    boxShadow: '3px 3px 3px rgba(68,68,68,0.6)'
  }
})

export default ({ data }) => {
  const post = data.markdownRemark
  let author = null
  if (post.frontmatter.author) {
    author = <h4>Author: {post.frontmatter.author}</h4>
  }
  return (
    <Card className={styles.card}>
      <CardHeader title={post.frontmatter.title} subheader={author} />
      <CardContent className={styles.divStyle}>
      <Typography component="p">
      { ReactHtmlParser(post.html) }
      </Typography>
      </CardContent>
    </Card>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        author
      }
    }
  }
`
