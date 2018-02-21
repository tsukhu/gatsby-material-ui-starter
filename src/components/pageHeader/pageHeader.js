import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import styles from './pageHeader.module.css';

const PageHeader = props => {
  return (
    <div className={styles.PageHeader}>
      <Toolbar>
        <ToolbarTitle text={props.text} />
      </Toolbar>
    </div>
  );
};

export default PageHeader;
