import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { challengeTableStyles } from '../../../../style/components/challenges/challenges';

let PriorityChip = props => {
  const { priority,classes } = props

  return priority.toLowerCase() === 'high' ? (
    <Chip label="H" className={classes.chipHigh} />
  ) : priority.toLowerCase() === 'medium' ? (
    <Chip label="M" className={classes.chipMedium} />
  ) : (
    <Chip label="L" className={classes.chipLow} />
  )
}

PriorityChip.propTypes = {
  classes: PropTypes.object.isRequired,
  priority: PropTypes.string.isRequired
}

export default withStyles(challengeTableStyles)(PriorityChip)
