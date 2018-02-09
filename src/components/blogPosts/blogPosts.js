import React, { Component } from 'react';
import g from 'glamorous';
import Link from 'gatsby-link';
import { rhythm } from '../../utils/typography';
export class BlogPosts extends Component {

  render() {
    return (
      <div>
        <h4>{this.props.markDown.totalCount} Posts</h4>
        {this.props.markDown.edges.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={{ textDecoration: `none`, color: `inherit` }}
            >
              <g.H3 marginBottom={rhythm(1 / 4)}>
                {node.frontmatter.title}{' '}
                <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
              </g.H3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

export default BlogPosts;
