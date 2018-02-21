import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import styles from './postHeader.module.css';

const PostHeader = props => {
  const pageHeader = 'Announcements and Posts ' + '(' + props.totalCount + ')';
  return (
    <div className={styles.PostHeader}>
      <Toolbar>
        <ToolbarTitle text={pageHeader} />
      </Toolbar>
    </div>
  );
};

export default PostHeader;
