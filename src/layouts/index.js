import 'babel-polyfill';
import React from 'react';
import { rhythm } from '../utils/typography';
import g from 'glamorous';

import withMui from '../components/withMUI/withMUI';
import Navigation from '../components/navigation/navigation';
import Ribbon from '../components/ribbon/ribbon';

const Index = ({ children, data }) => {
  return (
    <g.Div
      margin={`0 auto`}
      maxWidth={960}
      padding={rhythm(2)}
      paddingTop={rhythm(1)}
    >
      <Navigation title={data.site.siteMetadata.title} />
      <Ribbon />
      {children()}
    </g.Div>
  );
};

export default withMui(Index);
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
