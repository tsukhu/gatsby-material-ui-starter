import React from "react";
import styles from './blog-post.module.css';

export default ({ data }) => {
  const post = data.markdownRemark;
  let author = null;
  if (post.frontmatter.author) {
    author=<h4>Author: {post.frontmatter.author}</h4>;
  }
  return (
    <div className={styles.Post}>
      <h3>{post.frontmatter.title}</h3>
      {author}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </div>
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