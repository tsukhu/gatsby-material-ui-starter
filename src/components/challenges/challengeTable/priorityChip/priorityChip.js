import Chip from '@material-ui/core/Chip'
import { withStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import React from 'react'
import { challengeTableStyles } from '../../../../style/components/challenges/challenges'

let PriorityChip = props => {
  const { priority, classes } = props

  return priority.toLowerCase() === 'high' ? (
    <Tooltip title="High">
      <Chip label="H" className={classes.chipHigh} />
    </Tooltip>
  ) : priority.toLowerCase() === 'medium' ? (
    <Tooltip title="Medium">
      <Chip label="M" className={classes.chipMedium} />
    </Tooltip>
  ) : (
    <Tooltip title="Low">
      <Chip label="L" className={classes.chipLow} />
    </Tooltip>
  )
}

PriorityChip.propTypes = {
  classes: PropTypes.object.isRequired,
  priority: PropTypes.string.isRequired
}

export default withStyles(challengeTableStyles)(PriorityChip)
