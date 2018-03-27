import React from "react";
import Paper from 'material-ui/Paper'
import { listPageStyles } from '../utils/accessibility'

export default ({ data }) => {
  const post = data.markdownRemark;
  let author = null;
  if (post.frontmatter.author) {
    author=<h4>Author: {post.frontmatter.author}</h4>;
  }
  return (
    <Paper style={listPageStyles.paper} elevation={2}>
      <h3>{post.frontmatter.title}</h3>
      {author}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Paper>
  );
};

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
`;