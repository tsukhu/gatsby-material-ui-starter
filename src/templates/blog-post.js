import React from "react";

export default ({ data }) => {
  const post = data.markdownRemark;
  let author = null;
  if (post.frontmatter.author) {
    author=<h4>Author: {post.frontmatter.author}</h4>;
  }
  return (
    <div>
      <h1>{post.frontmatter.title}</h1>
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