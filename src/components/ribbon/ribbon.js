import React from 'react';
import MediaQuery from 'react-responsive';
import GitHubForkRibbon from 'react-github-fork-ribbon';

const Ribbon = data => (
  <MediaQuery query="(min-width: 1200px)">
    <GitHubForkRibbon
      href="//github.com/ERS-HCL/gatsby-demo-app"
      target="_blank"
      position="right"
      color="black"
    >
      Fork me on GitHub
    </GitHubForkRibbon>
  </MediaQuery>
);

export default Ribbon;
