import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import styles from './pageHeader.module.css';
import Subheader from 'material-ui/Subheader';

const PageHeader = props => {
  return (
    <div className={styles.PageHeader}>
       <Subheader>{props.text}</Subheader>      
      {/* <Toolbar>
        <ToolbarTitle text={props.text} />
      </Toolbar> */}
    </div>
  );
};

export default PageHeader;
