import React from 'react';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import styles from './pageHeader.module.css';
import ListSubheader from 'material-ui/List/ListSubheader';
import { getCorrectTextColor } from '../../utils/accessibility'


const headerStyles = {
  subheader: {
    color: getCorrectTextColor('#ACB7FE')
  }
}

const PageHeader = props => {
  return (
    <div className={styles.PageHeader}>
       <ListSubheader style={headerStyles.subheader}>{props.text}</ListSubheader>      
    </div>
  );
};

export default PageHeader;
