import React, { Component } from 'react';
// import g from 'glamorous';
import Link from 'gatsby-link';
// import { rhythm } from '../../utils/typography';
import styles from './blogPosts.module.css';

const NavLink = props => {
  if (!props.test) {
    return (
      <Link
        to={props.url}
        activeStyle={{
          color: 'red'
        }}
      >
        {props.text}
      </Link>
    );
  } else {
    return <span>{props.text}</span>;
  }
};

export class BlogPosts extends Component {
  render() {
    const { group, index, first, last, pageCount } = this.props.pathContext;
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    const isFirstPage = index - 1 === 0;
    const isLastPage = index == pageCount;
    return (
      <div>
        <h4 className={styles.H4}>
         Announcements and Posts ({this.props.totalCount})
        </h4>
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
        <div className={styles.pagination}>
          <small>
            Page {index}/{pageCount}
            <NavLink test={isFirstPage} url={previousUrl} text="<<" />
            <NavLink test={isLastPage} url={nextUrl} text=">>" />
          </small>
        </div>
      </div>
    );
  }
}

export default BlogPosts;
