import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import styles from './pageHeader.module.css';
import Subheader from 'material-ui/Subheader';
import { getCorrectTextColor } from '../../utils/accessibility'


const headerStyles = {
  subheader: {
    color: getCorrectTextColor('#ACB7FE')
  }
}

const PageHeader = props => {
  return (
    <div className={styles.PageHeader}>
       <Subheader style={headerStyles.subheader}>{props.text}</Subheader>      
    </div>
  );
};

export default PageHeader;
