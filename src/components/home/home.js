import React, { Component } from 'react';
import BlogPosts from '../blogPosts/blogPosts';
import RepoList from '../repoList/repoList';

class Home extends Component {
  render() {
    return (
      <div>
        <BlogPosts
          totalCount={this.props.blogPosts.totalCount}
          pathContext={this.props.blogPosts.pathContext}
        />
        <hr />
        <RepoList githubData={this.props.githubData} buildTime={this.props.buildTime}/>
      </div>
    );
  }
}

export default Home;
