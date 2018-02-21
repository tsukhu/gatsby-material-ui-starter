import React, { Component } from 'react';
import Link from 'gatsby-link';
import styles from './blogPosts.module.css';
import PostPagination from './postPagination/postPagination';
import PostHeader from './postHeader/postHeader';

export class BlogPosts extends Component {
  render() {
    const { group, index, first, last, pageCount } = this.props.pathContext;
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    const isFirstPage = index - 1 === 0;
    const isLastPage = index == pageCount;
    return (
      <div>
        <PostHeader
          totalCount={this.props.totalCount}
        />
        {group.map(({ node }) => (
          <div key={node.id}  className={styles.post}>
            <Link
              to={node.fields.slug}
              css={{ textDecoration: `none`, color: `inherit` }}
            >
              <h4
                className={styles.Margin}>
                {node.frontmatter.title}{' '}
                <span className={styles.PostSpan} color="#BBB">— {node.frontmatter.date}</span>
              </h4>
              <p className={styles.p}>{node.excerpt}</p>
            </Link>
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
    );
  }
}

export default BlogPosts;
