import React, { Component } from 'react';
import Link from 'gatsby-link';
// import styles from './blogPosts.module.css';
import PostPagination from './postPagination/postPagination';
import PageHeader from '../pageHeader/pageHeader';
import SimpleCard from '../simpleCard/simpleCard';



export class BlogPosts extends Component {
  render() {
    const { group, index, first, last, pageCount } = this.props.pathContext;
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    const isFirstPage = index - 1 === 0;
    const isLastPage = index == pageCount;
    const pageHeader = 'Announcements and Posts ' + '(' + this.props.totalCount + ')';
    return (
      <div>
        <PageHeader
          text={pageHeader.toUpperCase()}
        />
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
    );
  }
}

export default BlogPosts;
