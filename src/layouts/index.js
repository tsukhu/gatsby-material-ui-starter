import 'babel-polyfill';
import 'typeface-roboto';
import React from 'react';
// import { rhythm } from '../utils/typography';
// import g from 'glamorous';

import withMui from '../components/withMUI/withMUI';
import Navigation from '../components/navigation/navigation';
import Ribbon from '../components/ribbon/ribbon';
import styles from './index.module.css'
const Index = ({ children, data }) => {
  return (
    <div className={styles.Layout}    >
      <Navigation title={data.site.siteMetadata.title} />
      <Ribbon />
      {children()}
    </div>
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
