import React from 'react';
import g from 'glamorous';
import { css } from 'glamor';
import Link from 'gatsby-link';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { rhythm } from '../utils/typography';
import MediaQuery from 'react-responsive';


const linkStyle = css({ float: `right` });

export default ({ children, data }) => {
  const ribbon = (<MediaQuery query="(min-width: 1000px)">
  <GitHubForkRibbon
    href="//github.com/ERS-HCL/gatsby-demo-app"
    target="_blank"
    position="right"
    color="black"
  >
    Fork me on GitHub
  </GitHubForkRibbon>
  </MediaQuery>);
  return (
    <g.Div
      margin={`0 auto`}
      maxWidth={960}
      padding={rhythm(2)}
      paddingTop={rhythm(1)}
    >
      {ribbon}
      <Link to={`/`}>
        <g.H3
          marginBottom={rhythm(1)}
          display={`inline-block`}
          fontStyle={`normal`}
        >
          {data.site.siteMetadata.title}
        </g.H3>
      </Link>
      <Link className={linkStyle} to={`/about/`}>
        About
      </Link>
      <hr/>
      {children()}
    </g.Div>
  );
};

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
