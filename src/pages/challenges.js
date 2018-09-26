// import 'babel-polyfill';
import React from 'react';
import Challenges from '../components/challenges/challenges'
import Layout from '../components/layout'
export default ({ data }) => {
  return (
    <Layout>
    <Challenges />
    </Layout>
  );
};
