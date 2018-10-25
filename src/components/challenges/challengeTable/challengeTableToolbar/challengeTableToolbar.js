import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import HelpIcon from '@material-ui/icons/Help'
import CloudDownload from '@material-ui/icons/CloudDownload'
import FilterListIcon from '@material-ui/icons/FilterList'

import CircularProgress from '@material-ui/core/CircularProgress'
import { CSVLink } from 'react-csv'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { toolbarStyles } from '../../../../style/components/challenges/challenges'
const moment = require('moment-timezone')
moment.tz.setDefault('UTC')

let ChallengeTableToolbar = props => {
  const {
    data,
    user,
    numSelected,
    rowCount,
    classes,
    onClickAdd,
    onClickSearch,
    onClickLogin,
    onClickSave,
    onClickLogout,
    onClickHelp,
    isLoggedIn,
    isLoggingIn,
    isSaving,
    isLoading,
    isDirty,
    showHelp
  } = props
  const csvFileName =
    'Challenges_' + moment(new Date()).format('DD_MM_YYYY') + '.csv'

  const actionButton = isLoggedIn ? (
    <div className={classes.actionButtons}>
      {isDirty && (
        <div onClick={onClickSave} className={classes.wrapper}>
          <Tooltip title="Save to database">
            <Button color="primary" disabled={isSaving}>
              SAVE
            </Button>
          </Tooltip>
          {isSaving && (
            <div>
              <CircularProgress
                size={24}
                className={classes.progress}
                thickness={7}
              />
            </div>
          )}
        </div>
      )}
      <div onClick={onClickLogout} className={classes.wrapper}>
        <Tooltip title={user.email}>
          <Button color="primary">LOGOUT</Button>
        </Tooltip>
      </div>
      <Avatar alt="Remy Sharp" src={user.photoURL} className={classes.avatar} />
    </div>
  ) : (
    <div className={classes.wrapper}>
      <Tooltip title="Login (New/Existing)">
        <div>
          <Button
            color="primary"
            disabled={isLoggingIn || isLoading}
            onClick={onClickLogin}
          >
            LOGIN
          </Button>
        </div>
      </Tooltip>
      {isLoggingIn && (
        <div>
          <CircularProgress
            size={24}
            className={classes.progress}
            thickness={7}
          />
        </div>
      )}
    </div>
  )
  const dataLoading = isLoading ? (
    <div>
      <CircularProgress size={24} className={classes.progress} thickness={7} />
    </div>
  ) : null
  const HelpText = (showHelp ? 'Hide ' : 'Show ') + 'Help'
  const nChallenges = data ? data.length : 0
  const nFilterCount = rowCount ? rowCount : 0
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: nChallenges > 0
      })}
    >
      <div className={classes.title}>
        {nChallenges > 0 && (
          <Typography color="inherit" variant="subheading">
            {nFilterCount}/{nChallenges} challenges
          </Typography>
        )}
      </div>
      {dataLoading}
      <div className={classes.spacer} />
      {actionButton}
      <div className={classes.actions}>
        <div>
          {isLoggedIn === true && (
            <Tooltip title="Add">
              <IconButton aria-label="Add" onClick={onClickAdd}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          )}
          {isLoggedIn === true && (
            <Tooltip title="Download CSV">
              <CSVLink data={data} filename={csvFileName}>
                <IconButton aria-label="Download">
                  <CloudDownload />
                </IconButton>
              </CSVLink>
            </Tooltip>
          )}
          <Tooltip title="Filter list">
            <IconButton aria-label="Filter list" onClick={onClickSearch}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={HelpText}>
            <IconButton aria-label="Help doc" onClick={onClickHelp}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </Toolbar>
  )
}

ChallengeTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

export default withStyles(toolbarStyles)(ChallengeTableToolbar)
