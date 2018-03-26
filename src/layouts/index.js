import 'babel-polyfill';
import 'typeface-roboto';
import React from 'react';

import Navigation from '../components/navigation/navigation';
import Ribbon from '../components/ribbon/ribbon';
import styles from './index.module.css';
const Index = ({ children, data }) => {
  return (
    <div className={styles.body}>
      <section>
        <Navigation title={data.site.siteMetadata.title} />
        <Ribbon />
        {children()}
      </section>
    </div>
  );
};

export default Index;
export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
