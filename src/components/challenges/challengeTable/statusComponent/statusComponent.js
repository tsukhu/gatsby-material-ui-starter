import DoneAll from '@material-ui/icons/DoneAll'
import PlaylistAdd from '@material-ui/icons/PlaylistAdd'
import Cached from '@material-ui/icons/Cached'
import Assignment from '@material-ui/icons/Assignment'
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import { challengeTableStyles } from '../../../../style/components/challenges/challenges'

let StatusComponent = props => {
  const { classes, status } = props
  const svgIcon =
    status === 'Done' ? (
      <Tooltip title="Done" >
      <DoneAll className={classes.icon} />
      </Tooltip>
    ) : status === 'Approval Pending' ? (
      <Tooltip  title="Approval Pending">
      <PlaylistAdd className={classes.icon} />
      </Tooltip>
    ) : status === 'Backlog Item' ? (
      <Tooltip title="Backlog Item">
      <Assignment className={classes.icon} />
      </Tooltip>
    ) : (
      <Tooltip title="In Progress">
      <Cached className={classes.icon} />
      </Tooltip>
    )
  return <div className={classes.statusIcon}>{svgIcon}</div>
}

StatusComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired
}

export default withStyles(challengeTableStyles)(StatusComponent)
