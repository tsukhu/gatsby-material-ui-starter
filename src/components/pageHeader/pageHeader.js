import React from 'react';
import styles from './pageHeader.module.css';
import ListSubheader from 'material-ui/List/ListSubheader';
import { getCorrectTextColor } from '../../utils/accessibility'
import blueGrey from 'material-ui/colors/blueGrey'


const headerStyles = {
  subheader: {
    color: getCorrectTextColor(blueGrey[50])
  }
}

const PageHeader = props => {
  return (
    <div className={styles.PageHeader}>
       <ListSubheader style={headerStyles.subheader}>{props.text.toUpperCase()}</ListSubheader>      
    </div>
  );
};

export default PageHeader;
