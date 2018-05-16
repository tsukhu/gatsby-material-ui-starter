import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import HelpIcon from '@material-ui/icons/Help'
import FileDownload from '@material-ui/icons/FileDownload'
import FilterListIcon from '@material-ui/icons/FilterList'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import CircularProgress from '@material-ui/core/CircularProgress'
import { CSVLink } from 'react-csv'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import green from '@material-ui/core/colors/green'
const moment = require('moment-timezone')
moment.tz.setDefault('UTC')

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700]
    }
  },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    flex: '0 0 auto'
  },
  actionButtons: {
    display: 'flex',
    flex: '0 0 auto'
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative'
  },
  title: {
    flex: '0 0 auto'
  },
  avatar: {
    margin: 1
  },
  progress: {
    margin: theme.spacing.unit * 2
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  }
})

let EnhancedTableToolbar = props => {
  const {
    data,
    user,
    numSelected,
    classes,
    onClickEdit,
    onClickDownload,
    onClickAdd,
    onClickSearch,
    onClickDelete,
    onClickLogin,
    onClickSave,
    onClickLogout,
    onClickHelp,
    isLoggedIn,
    isLoggingIn,
    isSaving,
    isLoading,
    isEditable,
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
            <CircularProgress size={24} className={classes.progress} thickness={7} />
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
        <CircularProgress size={24} className={classes.progress} thickness={7} />
        </div>
      )}
    </div>
  )
  const dataLoading = isLoading ? (
    <div>
    <CircularProgress size={24} className={classes.progress} thickness={7}/>
    </div>
  ) : null
  const HelpText = (showHelp ? 'Hide ' : 'Show ') + 'Help'
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography color="inherit" variant="subheading" />
        )}
      </div>
      {dataLoading}
      <div className={classes.spacer} />
      {actionButton}
      <div className={classes.actions}>
        {numSelected > 0 && isLoggedIn === true ? (
          <div>
            {isEditable && (
              <div>
                <Tooltip title="Edit">
                  <IconButton aria-label="Edit" onClick={onClickEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton aria-label="Delete" onClick={onClickDelete}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )}
          </div>
        ) : (
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
                    <FileDownload />
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
        )}
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
}

export default withStyles(toolbarStyles)(EnhancedTableToolbar)
